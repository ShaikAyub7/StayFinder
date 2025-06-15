"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { searchProduct } from "@/utils/actions";
import { useState } from "react";

const SearchForm = ({ handleSearch }) => {
  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input type="text" name="search" placeholder="Search location" />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
