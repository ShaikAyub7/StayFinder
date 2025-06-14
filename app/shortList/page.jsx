"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserShortlists } from "@/utils/actions";

function ShortListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userShortlists"],
    queryFn: getUserShortlists,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching shortlists.</p>;

  if (data?.length === 0) return <p>No shortlisted products yet.</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.map((item) => (
        <div key={item.id} className="p-4 border rounded">
          <img
            src={item.product.imageUrls[0]}
            alt={item.product.title}
            className="w-full h-[200px] object-cover rounded"
          />
          <h2 className="text-lg font-semibold">{item.product.title}</h2>
          <p className="text-gray-500">₹{item.product.pricePerNight}</p>
        </div>
      ))}
    </div>
  );
}

export default ShortListPage;
