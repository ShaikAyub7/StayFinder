"use server";
import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { toast } from "sonner";

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

    toast("Product created");
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  return await prisma.product.findMany({});
};

export const getSingleProduct = async (id) => {
  const singleProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return singleProduct;
};
