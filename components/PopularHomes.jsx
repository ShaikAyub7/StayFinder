"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import SearchProducts from "./SearchProducts";

const PopularHomes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  const bengaluruHomes =
    data?.filter((product) =>
      product.location.toLowerCase().includes("bengaluru")
    ) || [];
  const hyderabadHomes =
    data?.filter((product) =>
      product.location.toLowerCase().includes("hyderabad")
    ) || [];
  const delhiHomes =
    data?.filter((product) =>
      product.location.toLowerCase().includes("delhi")
    ) || [];

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
            <div key={tab.location}>
              <h2 className="text-2xl font-medium mb-4 mt-3 capitalize">
                <Link
                  href={`location/${tab.location}`}
                  className="flex items-center "
                >
                  Popular homes in {tab.location}{" "}
                  <FaAngleRight className="text-[18px]" />
                </Link>
              </h2>
              <div className="flex gap-x-5 overflow-x-scroll p-2 scrollbar-hide">
                <ProductCard
                  location={tab.location}
                  PopularHome={tab.PopularHome}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PopularHomes;
