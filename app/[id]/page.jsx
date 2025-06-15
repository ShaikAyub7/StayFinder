"use client";

import { getSingleProductWithHost } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card } from "@/components/ui/card";
import Rating from "@/components/Rating";
import ImagesCarousel from "@/components/ImagesCarousel";

const Page = ({ params }) => {
  const { id } = React.use(params);

  const { data, isPending, isError } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => await getSingleProductWithHost(id),
  });
  console.log(data);
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching product</p>;

  return (
    <div className="max-w-6xl px-8 py-2 mx-auto">
      <div className="flex flex-col p-8">
        <h2 className="text-2xl font-semibold p-1">{data.title}</h2>
        <div className=" flex items-center justify-center gap-2 rounded-lg ">
          <div className="col-span-2 row-span-2">
            {/* <img
              src={data.imageUrls[0]}
              alt=""
              className="w-[400px] h-[200px] object-cover rounded-lg"
            /> */}
            <ImagesCarousel images={data.imageUrls} />
          </div>
        </div>
        <div className="p-2">
          <h1 className="text-lg font-bold">{data.title}</h1>
          <p className="text-gray-500">{data.description}</p>
        </div>
        <div className="flex gap-x-2 items-center p-2">
          <div className="flex items-center justify-rounded gap-x-1.5">
            <img
              src={data.host.image}
              alt="user image"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="text-sm text-gray-500 ">
            <h4>
              Hosted By <span className="font-bold">{data.host.name}</span>
            </h4>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold">What we Offers</h3>
          <div>
            {data.amenities.map((amenity, index) => {
              let icon = "";

              if (amenity === "Wifi") icon = "📶";
              else if (amenity === "Parking") icon = "🅿️";
              else if (amenity === "Breakfast") icon = "🍳";
              else icon = "✨";

              return (
                <p key={index} className="flex items-center gap-2">
                  <span>{icon}</span>
                  {amenity}
                </p>
              );
            })}
          </div>
        </div>

        <Rating id={data.id} />
      </div>
    </div>
  );
};

export default Page;
