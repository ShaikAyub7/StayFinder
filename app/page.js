"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import HyderabadHomes from "@/components/HyderabadHomes";
import BengaluruHomes from "@/components/BengaluruHomes";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading products…</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="  overflow-x-scroll gap-3 scrollbar-hide">
      <HyderabadHomes />
      <BengaluruHomes />
    </div>
  );
}
