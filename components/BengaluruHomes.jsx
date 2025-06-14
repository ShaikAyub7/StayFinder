"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import ProductCard from "./ProductCard";

const BengaluruHomes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  const bengaluruHomes =
    data?.filter((product) => product.location.toLowerCase() === "bengaluru") ||
    [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <>
      <div className="flex gap-x-4">
        <ProductCard location={"Bengaluru"} PopularHome={bengaluruHomes} />
      </div>
    </>
  );
};

export default BengaluruHomes;
