"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { getProducts } from "@/utils/actions";
import { useSearchParams } from "next/navigation";

const SearchProducts = () => {
  const searchParams = useSearchParams();
  const searchInput = searchParams.get("search")?.toLowerCase() || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading products…</p>;

  if (isError) return <p>Failed to load products.</p>;

  const searchData = data?.filter(
    (pro) =>
      pro.title.toLowerCase().includes(searchInput) ||
      pro.location.toLowerCase().includes(searchInput)
  );

  return (
    <div className="p-5">
      <ProductCard PopularHome={searchData} location={searchData.location} />
    </div>
  );
};

export default SearchProducts;
