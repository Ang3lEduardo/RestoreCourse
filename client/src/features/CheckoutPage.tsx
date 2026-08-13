import { Grid, Typography } from "@mui/material";
import OrderSummary from "../app/shared/components/OrderSummary";
import { loadStripe, type StripeElementsOptions, type Appearance } from "@stripe/stripe-js";
//import type { StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutStepper from "./checkout/CheckoutStepper";
import { useFetchBasketQuery } from "./basket/basketAPI";
import { useEffect, useRef } from "react";
import { useCreatePaymentIntentMutation } from "./checkout/CheckoutApi";
import { useAppSelector } from "../app/store/store";
//import { useMemo } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {

  const {data:basket} = useFetchBasketQuery();
  const [createPaymentIntent, {isLoading}] = useCreatePaymentIntentMutation();
  const created = useRef(false);
  const darkMode = useAppSelector(state => state.ui);

  useEffect(() =>{
    if(!created.current)
      createPaymentIntent();
    created.current = true;
  },[createPaymentIntent])

  const options: StripeElementsOptions | undefined = basket?.clientSecret
    ? {
        clientSecret: basket.clientSecret,
        appearance: {
          labels: 'floating',
          theme: darkMode ? 'night' : 'stripe',
        } as Appearance,
      }
    : undefined;
  // const options: StripeElementsOptions | undefined = useMemo(() => {
  //   if(!basket?.clientSecret) return undefined;
  //   return {
  //     clientSecret: basket.clientSecret
  //   }
  // },[basket?.clientSecret])

  return (
    <Grid container spacing={2}>
      <Grid size={8} >
        {!stripePromise || !options || isLoading ? (
          <Typography variant="h6">Loading checkout...</Typography>
        ) : 
        (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper></CheckoutStepper>
          </Elements>
        )}
      </Grid>
      <Grid size={4}>
        <OrderSummary ></OrderSummary>
      </Grid>
    </Grid>
  )
}