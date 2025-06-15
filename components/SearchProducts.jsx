import { useQuery } from "@tanstack/react-query";
import { fetchSearchProducts } from "@/utils/actions";
import ProductCard from "./ProductCard";

const SearchProducts = ({ product }) => {
  //   if (isLoading) return <p>Loading…</p>;

  return (
    <div>
      <ProductCard PopularHome={product} location={product.location} />
    </div>
  );
};

export default SearchProducts;
