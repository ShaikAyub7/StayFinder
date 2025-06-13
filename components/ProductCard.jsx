import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
const ProductCard = ({ title, description, price, createdAt, imageUrls }) => {
  console.log(title);
  return (
    <div className="mt-8">
      <img
        src={imageUrls[0]}
        alt="image"
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="p-3">
        <h4>{title}</h4>
        <p className="text-[12px] text-gray-500">${price} for night</p>
      </div>
    </div>
  );
};

export default ProductCard;
