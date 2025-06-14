"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/actions";
import HyderabadHomes from "@/components/HyderabadHomes";
import BengaluruHomes from "@/components/BengaluruHomes";
import DelhiHomes from "@/components/DelhiHomes";
import FlexLayout from "@/components/FlexLayout";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  if (isLoading) return <p>Loading products…</p>;
  if (isError) return <p>Failed to load products.</p>;
  console.log(data);
  return (
    <div className="  gap-3   max-w-6xl px-8 py-12 mx-auto ">
      <FlexLayout location={"hyderabad"} component={<HyderabadHomes />} />
      <FlexLayout location={"Bengaluru"} component={<BengaluruHomes />} />
      <FlexLayout location={"Delhi"} component={<DelhiHomes />} />
    </div>
  );
}
