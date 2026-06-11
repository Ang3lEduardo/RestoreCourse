
//import { useEffect, useState } from "react";
//import type { Product } from "../../app/models/product";
import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";

export default function Catalog() {

  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetch('https://localhost:5001/api/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  // }, [])
  
  const {data, isLoading} = useFetchProductsQuery();

  if(isLoading || !data) return <h2>Loading...</h2>;

  return (
      <>
          <ProductList products={data} />
      </>
  )
}