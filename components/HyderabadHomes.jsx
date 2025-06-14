"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import { Card } from "./ui/card";
import Link from "next/link";
import ProductCard from "./ProductCard";

const PopularHomes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  const hyderabadHomes =
    data?.filter((product) => product.location.toLowerCase() === "hyderabad") ||
    [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <>
      <div className="flex gap-x-4">
        <ProductCard location={"Bengaluru"} PopularHome={hyderabadHomes} />
      </div>
    </>
  );
};

export default PopularHomes;
