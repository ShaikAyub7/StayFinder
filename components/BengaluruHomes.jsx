"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import { Card } from "./ui/card";
import Link from "next/link";

const BengaluruHomes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  const hyderabadHomes =
    data?.filter((product) => product.location.toLowerCase() === "bengaluru") ||
    [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Popular homes in Bengaluru
      </h2>

      <div className="flex gap-1 overflow-x-auto pb-2">
        {hyderabadHomes.length === 0 ? (
          <p>No homes in Bengaluru found.</p>
        ) : (
          hyderabadHomes.map((home) => (
            <Link key={home.id} href={`/${home.id}`} className="min-w-[220px]">
              <Card className="w-[220px] p-3 rounded-lg shadow-md hover:shadow-lg transition duration-200">
                <img
                  src={home.imageUrls[0]}
                  alt={home.title}
                  className="w-full h-[180px] rounded-lg object-cover mb-2"
                />
                <h3 className="font-medium text-lg truncate">{home.title}</h3>
                <p className="text-sm text-gray-500">
                  ₹{home.pricePerNight} per night
                </p>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default BengaluruHomes;
