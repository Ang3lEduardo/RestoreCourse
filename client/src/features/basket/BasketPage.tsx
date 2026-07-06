import { Grid, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketAPI"
import BasketItem from "./BasketItem";
import OrderSummary from "../../app/shared/components/OrderSummary";

export default function BasketPage() {
  
  const {data, isLoading} = useFetchBasketQuery();

  if (isLoading) return <Typography variant="h3">Loading...</Typography>

  if(!data || data.items.length === 0) return <Typography variant="h3">The cart is empty.</Typography>

  return (
    <Grid container spacing={2}>
        <Grid size={8}>
            {data.items.map(item => (
                <BasketItem item={item} key={item.productId}/>
            ))}
        </Grid>
        <Grid size={4}>
            <OrderSummary />
        </Grid>
    </Grid>
  )
}