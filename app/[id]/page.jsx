"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleProductWithHost, rateProduct } from "@/utils/actions";
import ImagesCarousel from "@/components/ImagesCarousel";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

export default function ProductPage({ params }) {
  const queryClient = useQueryClient();
  const { id } = React.use(params);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getSingleProductWithHost(id),
    enabled: !!id,
  });

  const [position, setPosition] = useState(null);
  const [rateValue, setRateValue] = useState(0);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (!data?.location) return;

        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${data.location}&key=ba022dcba80f4f21acd9aa84d2eea71e`
        );

        if (res.data.results.length > 0) {
          const { lat, lng } = res.data.results[0].geometry;
          setPosition([lat, lng]);
        } else {
          console.error("No location found.");
        }
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    };

    fetchCoordinates();
  }, [data]);

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
      <ImagesCarousel images={data.imageUrls} />
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

      <div className="mt-8">
        {position ? (
          <DynamicMap position={position} location={data.location} />
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </Card>
  );
}
