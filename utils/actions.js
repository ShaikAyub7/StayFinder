"use server";
import prisma from "./db";
import { auth } from "@clerk/nextjs/server";

export const createProduct = async (formData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized — please log in.");
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const location = formData.get("location");
  const pricePerNight = formData.get("pricePerNight");

  const imageUrls = formData.getAll("imageUrls");
  const amenities = formData.getAll("amenities");
  const intPrice = parseInt(pricePerNight, 10);

  const product = await prisma.product.create({
    data: {
      title: title,
      description: description,
      location: location,
      pricePerNight: intPrice,
      imageUrls: imageUrls,
      amenities: amenities,
      hostId: userId,
    },
  });

  return product;
};
