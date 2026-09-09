import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react"
import Review from "./Review";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import type { StripeAddressElementChangeEvent } from "@stripe/stripe-js/dist/stripe-js/elements/address";
import type { StripePaymentElementChangeEvent } from "@stripe/stripe-js/dist/stripe-js/elements/payment";
import { useBasket } from "../../lib/hooks/useBasket";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify";
import type { ConfirmationToken } from "@stripe/stripe-js/dist/api/confirmation-tokens";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../orders/orderApi";

const steps = ['Address', 'Payment', 'Review']

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [createOrder] = useCreateOrderMutation();
  const {data, isLoading} = useFetchAddressQuery();
  const [updateAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const {basket,total,clearBasket} = useBasket();
  const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  let name, restAddress;
  if(data){
   ({name, ...restAddress} = data);
  }

  const handleNext = async () => {
     if(activeStep === 0 && saveAddressChecked && elements){
        const address = await getStripeAddress();
        if(address) await updateAddress(address);
     }
     if(activeStep === 1){
        if(!elements || !stripe) return;

        const result = await elements.submit();
        if(result.error) return toast.error(result.error.message);

        const stripeResult = await stripe.createConfirmationToken({elements});
        if(stripeResult.error) return toast.error(stripeResult.error.message);

        setConfirmationToken(stripeResult.confirmationToken);

     }
     if(activeStep === 2){
      await confirmPayment();
     }
     if(activeStep < 2) setActiveStep(step => step +1);
  }

  const confirmPayment = async () => {
   setSubmitting(true);
   try{
      if(!confirmationToken || !basket?.clientSecret) 
         throw new Error('Unable to process payment. Please try again later.');
      const orderModel = await createOrderModel();
      const orderResult = await createOrder(orderModel);

      const paymentResult = await stripe?.confirmPayment({
         clientSecret: basket.clientSecret,
         redirect: 'if_required',
         confirmParams: {
            confirmation_token: confirmationToken.id
         }
      });

      if(paymentResult?.paymentIntent?.status === 'succeeded') { 
         navigate('/checkout/success',{state:orderResult});
         clearBasket();
      }
      else if (paymentResult?.error) {
         throw new Error(paymentResult.error.message);
      }
      else {
         throw new Error('Something went wrong. Please try again later.');
      }
   }
   catch(error){
      if(error instanceof Error){
         toast.error((error as Error).message);
      }
      setActiveStep(step => step - 1);
   }
   finally{
      setSubmitting(false);
   }
  }

  const createOrderModel = async () => {
   const shippingAddress = await getStripeAddress();
   const paymentSummary = confirmationToken?.payment_method_preview.card;

   if(!shippingAddress || !paymentSummary) throw new Error('Problem creating the order');

   return {shippingAddress, paymentSummary}
  }

  const handleBack = () => {
     setActiveStep(step => step-1);
  }

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => { 
     setAddressComplete(event.complete);
  }

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => { 
     setPaymentComplete(event.complete);
  }

  const getStripeAddress = async () => {
      const addressElement = elements?.getElement('address');
      if(!addressElement) return null;
      const {value:{name, address}} = await addressElement.getValue();
      if(name && address)
         return {...address, name};

      return null;
   }

   if(isLoading) return <Typography variant="h6">Loading checkout...</Typography>

  return (
    <Paper sx={{p:3, borderRadius:3}}>
         <Stepper activeStep={activeStep}>
          {steps.map((label, index) =>{
               return (
                    <Step key={index}>
                         <StepLabel>{label}</StepLabel>
                    </Step>
               )
          })}
         </Stepper>

         <Box sx={{mt:2}}>
            <Box sx={{display:activeStep===0 ? 'block' : 'none'}}>
                      {/* Address Step */}
               <AddressElement
                options={{
                  mode:'shipping',
                  defaultValues:{
                     name:name,
                     address: restAddress
                  }
                }}
                onChange = {handleAddressChange}
               ></AddressElement>
               <FormControlLabel sx={{display:'flex', justifyContent:'center'}}
                control={<Checkbox 
                        checked={saveAddressChecked} onChange={(e) => setSaveAddressChecked(e.target.checked)}
                 />}
                label="Save this as the default shipping address"
               />
            </Box>
            <Box sx={{display:activeStep===1 ? 'block' : 'none'}}>
                      {/* Payment Step */}
               <PaymentElement 
                  onChange={handlePaymentChange}
                  options={{
                     wallets: {
                        applePay: 'never',
                        googlePay: 'never'
                     }
                  }}
               />
            </Box>
            <Box sx={{display:activeStep===2 ? 'block' : 'none'}}>
                      {/* Review Step */}
               <Review confirmationToken={confirmationToken} />
            </Box>
         </Box>

         <Box sx={{display:'flex', paddingTop:2, justifyContent:'space-between'}}>
             <Button onClick={handleBack}>Back</Button>
             <Button onClick={handleNext}
               disabled={
                  (activeStep === 0 && !addressComplete) ||
                  (activeStep === 1 && !paymentComplete) || submitting
               }
               loading={submitting}
             >{activeStep === steps.length - 1 ? `Pay ${currencyFormat(total)}` : 'Next'}
             </Button>
         </Box>
     </Paper>
  )
}
