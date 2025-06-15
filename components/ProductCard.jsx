import React from "react";
import Link from "next/link";
import ShortList from "./ShortList";
import { IoMdStar } from "react-icons/io";

const ProductCard = ({ location, PopularHome }) => {
  return (
    <>
      {PopularHome.length === 0 ? (
        <p>No homes in {location} found.</p>
      ) : (
        PopularHome.map((home) => (
          <div
            key={home.id}
            className="w-[220px] min-w-[250px]   rounded-t-[15px]  transition duration-200 gap-1.5 relative bg-transparent"
          >
            <ShortList id={home.id} shortList={home.shortList} />
            <Link key={home.id} href={`/${home.id}`} className=" ">
              <div>
                <img
                  src={home.imageUrls[0]}
                  alt={home.title}
                  className="w-full h-[230px] rounded-t-[15px] object-cover mb-1"
                />
              </div>
              <div className="bg-white shadow-md p-2 rounded-b-[15px]">
                <h3 className="font-medium text-[0.8125rem] p-0.5 truncate capitalize">
                  {home.title}
                </h3>
                <div className="flex text-[0.6875rem] gap-x-4 text-gray-500  p-0.5">
                  <p className=" ">₹{home.pricePerNight} for 1 night</p>
                  <p className="flex items-center gap-x-1">
                    <IoMdStar /> {home.rating}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default ProductCard;
