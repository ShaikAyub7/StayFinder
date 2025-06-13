"use client";

import { getSingleProduct } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card } from "@/components/ui/card";

const Page = ({ params }) => {
  const { id } = React.use(params);

  const { data, isPending, isError } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => await getSingleProduct(id),
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching product</p>;

  return (
    <Card className="flex flex-col p-4 ">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-lg overflow-hidden">
        <div className="col-span-2 row-span-2">
          <img
            src={data.imageUrls[0]}
            alt=""
            className="w-[400px] h-[200px] object-cover rounded-lg"
          />
        </div>

        {data.imageUrls.slice(1, 4).map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt=""
              className="w-[400px] h-[200px]  object-cover rounded-lg"
            />
          </div>
        ))}

        {/* <button className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg shadow">
          Show all photos
        </button> */}
      </div>

      <div className="p-3">
        <h1 className="text-lg">{data.title}</h1>
        <p className="text-gray-500">{data.description}</p>
        <p className="text-md flex gap-2.5">{data.amenities}</p>
        <p className="text-gray-500 font-bold">price : ${data.pricePerNight}</p>
      </div>
    </Card>
  );
};

export default Page;
