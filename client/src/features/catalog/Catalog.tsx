
//import { useEffect, useState } from "react";
//import type { Product } from "../../app/models/product";
import { Grid, Typography } from "@mui/material";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./CatalogSlice";


export default function Catalog() {

  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetch('https://localhost:5001/api/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  // }, [])
  const dispatch = useAppDispatch();
  const productParams = useAppSelector(state => state.catalog);
  
  const {data, isLoading} = useFetchProductsQuery(productParams);
  const {data:filtersData, isLoading: filtersLoading} = useFetchFiltersQuery();

  if(isLoading || !data || filtersLoading || !filtersData) return <h2>Loading...</h2>;

  return (
      <Grid container spacing={4}>
          <Grid size={3}>
            <Filters filtersData={filtersData} />
          </Grid>
          <Grid size={9}>
            {data.items && data.items.length === 0 ? 
            <Typography variant="h5">No products found</Typography> : 
            (
            <>
            <ProductList products={data.items} />
            <AppPagination metadata={data.pagination}
             onPageChange={(page:number) =>{ 
              dispatch(setPageNumber(page));
              window.scrollTo({top: 0, behavior: 'smooth'});
             }}/>
            </>
            )}
          </Grid>
      </Grid>
  )
}