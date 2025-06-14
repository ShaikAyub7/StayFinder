"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function LocationPage() {
  const { location } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["location"],
    queryFn: getProducts,
  });

  const products =
    data?.filter(
      (product) => product.location.toLowerCase() === location.toLowerCase()
    ) || [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  if (!products.length) {
    return <p>No products found in {location}</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Houses in {location}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center lg:grid-cols-4 gap-8">
        <ProductCard location={location} PopularHome={products} />
      </div>
    </div>
  );
}
