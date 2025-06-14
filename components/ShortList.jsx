"use client";
import { addToShortlist } from "@/utils/actions";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ShortList = ({ id }) => {
  return (
    <form action={addToShortlist} className="absolute top-2 right-2.5 p-4">
      <Input type="hidden" name="productId" value={id} />
      <Button type="submit" variant="outline">
        ❤️ Like
      </Button>
    </form>
  );
};

export default ShortList;
