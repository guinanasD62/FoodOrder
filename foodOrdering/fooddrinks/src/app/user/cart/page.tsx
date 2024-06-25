"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart, selectCartItems, selectTotalAmount } from '@/redux/customerSlice/cartReducer';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';

const UserCart = () => {
    const cartItems = useSelector((state: RootState) => selectCartItems(state));
    const totalAmount = useSelector((state: RootState) => selectTotalAmount(state));
    const user = useSelector((state: RootState) => state.session.user);
    const dispatch = useDispatch();

    console.log('Cart Items:', cartItems);
    console.log('Total Amount:', totalAmount);
    console.log('User:', user);

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>User Cart</Typography>
            {user && (
                <Box mb={2}>
                    <Typography>User: {user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Address: {user.address}</Typography>
                </Box>
            )}
            <Box>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={9}>
                                    <Typography variant="h6">{item.menuItem.name}</Typography>
                                    {/* <Typography>Restaurant ID: {item.menuItem.restaurantId}</Typography>
                                    <Typography>Item ID: {item.menuItem.id}</Typography> */}
                                    <Typography>Price: ${item.menuItem.price.toFixed(2)}</Typography>
                                    <Typography>Quantity: {item.quantity}</Typography>
                                </Grid>
                                <Grid item xs={3} textAlign="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => dispatch(removeFromCart(item.menuItem.id))}
                                    >
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                ) : (
                    <Typography>No items in the cart</Typography>
                )}
                <Typography variant="h5">Total Amount: ${totalAmount.toFixed(2)}</Typography>
            </Box>
        </Box>
    );
};

export default UserCart;
