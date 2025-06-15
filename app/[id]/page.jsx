"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleProductWithHost, rateProduct } from "@/utils/actions";
import { useState } from "react";
import ImagesCarousel from "@/components/ImagesCarousel";
import React from "react";
import Rating from "@/components/Rating";
import { Card } from "@/components/ui/card";

export default function ProductPage({ params }) {
  const queryClient = useQueryClient();
  const { id } = React.use(params);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getSingleProductWithHost(id),
  });

  const [rateValue, setRateValue] = useState(0);

  const handleRate = async () => {
    const formData = new FormData();
    formData.set("productId", id);
    formData.set("rate", rateValue);

    await rateProduct(formData);
    queryClient.invalidateQueries(["singleProduct", id]);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching product.</p>;

  return (
    <Card className="flex flex-col p-4 max-w-4xl mx-auto">
      <div className=" flex items-center justify-center gap-2 rounded-lg ">
        <div className="w-full">
          <ImagesCarousel images={data.imageUrls} />
        </div>
      </div>

      <h1 className="text-3xl font-semibold mt-6">{data.title}</h1>
      <p className="text-gray-700 mt-2">{data.description}</p>
      <p className="mt-4 font-medium text-lg">Hosted by {data.host.name}</p>
      <p className="text-gray-500">Email: {data.host.email}</p>

      <div className="flex items-center mt-6 gap-4">
        <input
          type="number"
          min="1"
          max="5"
          value={rateValue}
          onChange={(e) => setRateValue(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <button
          onClick={handleRate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Rate
        </button>
      </div>
    </Card>
  );
}
