"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import ProductCard from "./ProductCard";

const PopularHomes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  const bengaluruHomes =
    data?.filter((product) => product.location.toLowerCase() === "bengaluru") ||
    [];
  const hyderabadHomes =
    data?.filter((product) => product.location.toLowerCase() === "hyderabad") ||
    [];
  const delhiHomes =
    data?.filter((product) => product.location.toLowerCase() === "delhi") || [];

  const tabs = [
    {
      location: "bengaluru",
      PopularHome: bengaluruHomes,
    },
    {
      location: "hyderabad",
      PopularHome: hyderabadHomes,
    },
    {
      location: "delhi",
      PopularHome: delhiHomes,
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <>
      <div className=" gap-x-6">
        {tabs.map((tab) => {
          return (
            <>
              <h2 className="text-2xl font-medium mb-4 mt-3 capitalize">
                Popular homes in {tab.location}
              </h2>
              <div className="flex gap-x-5 overflow-x-scroll p-5 scrollbar-hide">
                <ProductCard
                  location={tab.location}
                  PopularHome={tab.PopularHome}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default PopularHomes;
