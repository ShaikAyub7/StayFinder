"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import { Card } from "./ui/card";
import Link from "next/link";
import ProductCard from "./ProductCard";

const DelhiHomes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  const DelhiHomes =
    data?.filter((product) => product.location.toLowerCase() === "delhi") || [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return <ProductCard location={"delhi"} PopularHome={DelhiHomes} />;
};

export default DelhiHomes;
