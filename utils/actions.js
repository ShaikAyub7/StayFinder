"use server";
import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";

export const createProduct = async (formData) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized — please log in.");
    }

    const files = formData.getAll("imageUrls");
    const imageUrls = [];

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const imageUrl = await uploadToCloudinary(Buffer.from(buffer), file.name);
      imageUrls.push(imageUrl);
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const location = formData.get("location");
    const pricePerNight = formData.get("pricePerNight");
    const amenities = formData.getAll("amenities");
    const intPrice = parseInt(pricePerNight, 10);

    const product = await prisma.product.create({
      data: {
        title,
        description,
        location,
        pricePerNight: intPrice,
        imageUrls,
        amenities,
        hostId: userId,
      },
    });

    revalidatePath("/");
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  return await prisma.product.findMany({});
};

export const getSingleProductWithHost = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return null;

  const hostUser = await users.getUser(product.hostId);

  return {
    ...product,
    host: {
      name: hostUser.firstName,
      email: hostUser.emailAddresses[0].emailAddress,
      image: hostUser.imageUrl,
    },
  };
};
export async function rateProduct(formData) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) throw new Error("Unauthorized");

  let existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!existingUser) {
    existingUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName || "Unnamed",
      },
    });
  }

  const productId = formData.get("productId");
  const rateValue = parseFloat(formData.get("rate"));

  if (!productId || isNaN(rateValue)) {
    throw new Error("Invalid productId or rating value");
  }

  await prisma.rating.upsert({
    where: {
      productId_userId: {
        productId,
        userId: existingUser.id,
      },
    },
    update: {
      value: rateValue,
    },
    create: {
      productId,
      userId: existingUser.id,
      value: rateValue,
    },
  });

  const ratings = await prisma.rating.findMany({
    where: { productId },
  });

  const total = ratings.reduce((sum, r) => sum + r.value, 0);
  const average = ratings.length > 0 ? total / ratings.length : 0;

  await prisma.product.update({
    where: { id: productId },
    data: { rating: average },
  });

  revalidatePath(`/${productId}`);
}

export const addToShortlist = async (formData) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const productId = formData.get("productId");

  let existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!existingUser) {
    existingUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName || "Unnamed",
      },
    });
  }

  await prisma.shortlist.create({
    data: {
      user: { connect: { id: existingUser.id } },
      product: { connect: { id: productId } },
    },
  });
  revalidatePath("/");
  console.log(`Product ${productId} shortlisted by ${existingUser.email}`);
};

export async function removeFromShortlist(productId) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) throw new Error("User not found");

  await prisma.shortlist.deleteMany({
    where: {
      productId,
      userId: user.id,
    },
  });

  return { message: "Product removed from shortlist." };
}

export async function getUserShortlists() {
  const { userId } = auth();
  if (!userId) {
    console.error("No Clerk userId found.");
    throw new Error("Unauthorized");
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!existingUser) {
    console.error("User not found in database for Clerk ID:", userId);
    throw new Error("User not found in DB");
  }

  const shortlists = await prisma.shortlist.findMany({
    where: { userId: existingUser.id },
    include: { product: true },
  });

  return shortlists;
}

export async function getProductAverageRating(productId) {
  const ratings = await prisma.rating.findMany({
    where: { productId },
  });

  if (ratings.length === 0) return 0;

  const total = ratings.reduce((sum, r) => sum + r.value, 0);
  return (total / ratings.length).toFixed(1);
}

export const searchProduct = async (formData) => {
  const searchInput = formData.get("search");

  if (!searchInput) {
    throw new Error("Search input is required");
  }

  const searchResults = await prisma.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchInput,
            mode: "insensitive",
          },
        },
        {
          location: {
            contains: searchInput,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return searchResults;
};
