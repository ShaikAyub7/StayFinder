"use client";

import { rateProduct } from "@/utils/actions";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Rating = ({ id }) => {
  return (
    <form action={rateProduct} className="  p-4 flex gap-2 items-center">
      <Input type="hidden" name="productId" value={id} />
      <Input
        type="range"
        name="rate"
        min="0"
        max="5"
        step="0.5"
        className="w-20"
        placeholder="0-5"
        required
      />
      <Button type="submit" variant="outline">
        ❤️ Rate
      </Button>
    </form>
  );
};

export default Rating;
