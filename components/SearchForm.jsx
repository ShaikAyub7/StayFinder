"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import SearchProducts from "./SearchProducts";
const handleSearch = (formData) => {
  const searchInput = formData.get("search");
  if (!searchInput) {
    throw new Error("Search input is required");
  }
  return <SearchProducts searchInput={searchInput} />;
};

const SearchForm = () => {
  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 p-3 w-[400px]">
        <Input type="text" name="search" placeholder="Search location" />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
