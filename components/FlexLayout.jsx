"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import ProductCard from "./ProductCard";

const FlexLayout = ({ component, location }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  const FlexLayout =
    data?.filter((product) => product.location.toLowerCase() === "bengaluru") ||
    [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <>
      <h2 className="text-2xl font-medium mb-4 mt-3 capitalize">
        Popular homes in {location}
      </h2>
      <div className="flex overflow-scroll scrollbar-hide gap-x-4 mt-2 mb-2 p-4">
        {component}
      </div>
    </>
  );
};

export default FlexLayout;
