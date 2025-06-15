"use client";
import { addToShortlist } from "@/utils/actions";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

const ShortList = ({ id, shortList }) => {
  return (
    <form action={addToShortlist} className="absolute top-2 right-0 p-1">
      <Input type="hidden" name="productId" value={id} />
      <Button
        type="submit"
        variant="icon"
        className={"cursor-pointer text-2xl"}
      >
        {shortList ? <IoHeart /> : <IoMdHeartEmpty />}
      </Button>
    </form>
  );
};

export default ShortList;
