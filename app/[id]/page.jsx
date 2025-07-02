"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleProductWithHost, rateProduct } from "@/utils/actions";
import ImagesCarousel from "@/components/ImagesCarousel";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        }
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    };

    fetchCoordinates();
  }, [data]);

  const handleRate = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.set("productId", id);
    formData.set("rate", rateValue.toString());

    await rateProduct(formData);
    queryClient.invalidateQueries(["singleProduct", id]);
    setIsSubmitting(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Error fetching product.</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-8 px-4">
      <Card className="max-w-6xl mx-auto p-6 rounded-xl shadow-lg bg-white/70 backdrop-blur-sm">
        <ImagesCarousel images={data.imageUrls} />

        <div className="mt-6 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{data.title}</h1>
          <p className="text-lg text-gray-600">{data.description}</p>
          <div className="mt-6 mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  Proceed to Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white shadow-xl rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Confirm Purchase
                </h2>
                <p className="text-gray-700 mb-6 text-center">
                  You are about to purchase <strong>{data.title}</strong> for{" "}
                  <strong>${data.price}</strong>.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Pay Now
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <img
              src={data.host.image}
              alt="host"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <div>
              <p className="text-sm text-gray-500">Hosted by</p>
              <p className="text-md font-semibold text-gray-800">
                {data.host.name}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-6 ">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <Star
                  key={val}
                  className={`h-6 w-6 cursor-pointer transition ${
                    rateValue >= val ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setRateValue(val)}
                  fill={rateValue >= val ? "currentColor" : "none"}
                />
              ))}
            </div>
            <Button
              onClick={handleRate}
              className="mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Rating"}
            </Button>
          </div>

          {/* Map */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Location
            </h2>
            {position ? (
              <DynamicMap position={position} location={data.location} />
            ) : (
              <p className="text-gray-500">Loading map...</p>
            )}
          </div>

          {/* Payment Modal */}
        </div>
      </Card>
    </div>
  );
}
