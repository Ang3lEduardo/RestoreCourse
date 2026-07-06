//import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
//import type { Product } from "../../app/models/product";
//import Grid from "@mui/material/Grid";
//import Typography from "@mui/material/Typography";
import { Divider, Grid, Table, Typography, TableBody, TableContainer, TextField, Button, TableRow, TableCell } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketAPI";
import { useState } from "react";

export default function ProductDetails() {
  const {id} = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const {data: basket} = useFetchBasketQuery();
  const item = basket?.items.find(i => i.productId === +id!);
  const [quantity, setQuantity] = useState(item?.quantity ?? 0);

  //useEffect(() => {
  //  if(item) setQuantity(item.quantity);
  //}, [item]);

  const {data: product, isLoading} = useFetchProductDetailsQuery(id ? +id : 0);

  const handleUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
    if(!item || quantity > item.quantity) {
      addBasketItem({product: product!, quantity: updatedQuantity});
    }
    else{
      removeBasketItem({productId: product!.id, quantity: updatedQuantity});
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    if(value >= 0) setQuantity(value);
  };

  // const [product, setProduct] = useState<Product | null>(null);

  // useEffect(() => {
  //   fetch(`https://localhost:5001/api/products/${id}`)
  //     .then(response => response.json())
  //     .then(data => setProduct(data))
  //     .catch(error => console.error('Error fetching product:', error));
  // }, [id]);

   if(!product || isLoading) return <h2>Loading...</h2>;

  const productDetails = [
    {label: 'Name', value: product.name},
    {label: 'Description', value: product.description},
    {label: 'Type', value: product.type},
    {label: 'Brand', value: product.brand},
    {label: 'Quantity in Stock', value: product.quantityInStock}
  ]

  return (
    <Grid container spacing={6} sx={{mx:'auto', maxWidth:'lg'}}>
      <Grid size={6}>
        <img src={product?.pictureUrl} alt={product?.name} style={{width:'100%'}} />
      </Grid>
      <Grid size={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mb:2}} />
        <Typography variant="h4" color="secondary">${(product.price /100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{
            '& td': {fontSize: '1rem  '}
          }}>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell><strong>{detail.label}</strong></TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{mt:3}}>
          <Grid size={6}>
            <TextField variant="outlined" 
                       type="number" 
                       label="Quantity in cart" 
                       fullWidth value={quantity} 
                       onChange={handleInputChange} />
          </Grid>
          <Grid size={6}>
              <Button onClick={handleUpdateBasket}
                      disabled={(quantity === item?.quantity) || (!item && quantity === 0)}
                      sx={{height: '100%'}} 
                      color="primary" 
                      size="large" 
                      variant="contained" 
                      fullWidth>
                {item ? 'Update Cart' : 'Add to Cart'}
              </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}