import {  Divider, Button, TextField, Paper, Box, Typography } from "@mui/material";
import { currencyFormat } from "../../../lib/util";
import { useFetchBasketQuery } from "../../../features/basket/basketAPI";
import type { Item } from "../../models/basket";
import { NavLink } from "react-router-dom";

export default function OrderSummary() {
    const {data:basket} = useFetchBasketQuery();
    const subtotal = basket ? basket.items.reduce((sum: number, item: Item) => sum + (item.price * item.quantity), 0) : 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    return (
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', maxWidth:'lg', mx:'auto'}}>
            <Paper sx={{ mb: 2, p: 3, width: '100%', borderRadius: 3 }}>

                <Typography variant="h6" component="p" sx={{fontWeight:'bold'}}>
                    Order summary
                </Typography>
                <Typography variant="body2" sx={{fontStyle: 'italic'}}>
                    Orders over $100 qualify for free delivery!
                </Typography>
                <Box sx={{mt:2}}>
                    <Box sx={{display:'flex', justifyContent:'space-between', mb:1}}>
                        <Typography color="textSecondary">Subtotal</Typography>
                        <Typography>
                            {currencyFormat(subtotal)}
                        </Typography>
                    </Box>
                    <Box sx={{display:'flex',justifyContent:'space-between',mb:1}} >
                        <Typography color="textSecondary">Discount</Typography>
                        <Typography color="success">
                            {/* TODO */}
                            -$0.00
                        </Typography>
                    </Box>
                    <Box sx={{display:'flex',justifyContent:'space-between',mb:1}}>
                        <Typography color="textSecondary">Delivery fee</Typography>
                        <Typography>
                            {currencyFormat(deliveryFee)}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{display:'flex',justifyContent:'space-between',mb:1}}>
                        <Typography color="textSecondary">Total</Typography>
                        <Typography>
                            {currencyFormat(subtotal + deliveryFee)}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{mt:2}}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mb: 1 }}
                        component={NavLink}
                        to="/checkout"
                    >
                        Checkout
                    </Button>
                    <Button
                        fullWidth
                        component={NavLink}
                        to="/catalog"
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Paper>

            {/* Coupon Code Section */}
            <Paper sx={{ width: '100%', borderRadius: 3, p: 3 }}>

                <form>
                    <Typography variant="subtitle1" component="label">
                        Do you have a voucher code?
                    </Typography>

                    <TextField
                        label="Voucher code"
                        variant="outlined"
                        fullWidth
                        sx={{ my: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Apply code
                    </Button>
                </form>
            </Paper>
        </Box>
    )
}