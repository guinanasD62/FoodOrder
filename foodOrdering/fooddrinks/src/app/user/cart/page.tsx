"use client";

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearCart, removeFromCart, selectCartItems, selectTotalAmount } from '@/redux/customerSlice/cartReducer';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface MenuOrder {
    _id: string;
    quantity: number;
    restaurant: string;
}

const UserCart = () => {
    const cartItems = useSelector((state: RootState) => selectCartItems(state));
    const totalAmount = useSelector((state: RootState) => selectTotalAmount(state));
    const user = useSelector((state: RootState) => state.session.user);
    const dispatch = useDispatch();

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    console.log('Cart Items:', cartItems);
    console.log('Total Amount:', totalAmount);
    console.log('User:', user);

    const fetchMenuItem = async (menuItemId: string): Promise<MenuOrder> => {
        try {
            const response = await axios.get(`http://localhost:3007/getmenu/${menuItemId}`);
            return response.data.data;
        } catch (error) {
            throw new Error("Failed to fetch menuItem");
        }
    };

    const handleUpdate = async (menuItemId: string, orderQuantity: number) => {
        try {
            const menuItem = await fetchMenuItem(menuItemId);
            const newQuantity = menuItem.quantity - orderQuantity;

            if (newQuantity < 0) {
                throw new Error("Insufficient stock");
            }

            const response = await axios.put(`http://localhost:3007/updatemenu/${menuItemId}`, {
                quantity: newQuantity,
            });

            if (response.status === 200) {
                console.log(`Menu item ${menuItemId} updated successfully`);
            } else {
                throw new Error("Failed to update menu item");
            }
        } catch (error) {
            console.error("Failed to update menu item", error);
            setError("Failed to update menu item");
        }
    };

    const handlePlaceOrder = async () => {
        for (const item of cartItems) {
            await handleUpdate(item.menuItem.id, item.quantity);
        }
        dispatch(clearCart());
        router.push(`/user`);
    };

    if (error) return <div>{error}</div>;

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>Your Cart</Typography>
            {user && (
                <Box mb={2}>
                    <Typography>User: {user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Address: {user.address}</Typography>
                    <Typography>ID: {user.id}</Typography>
                </Box>
            )}
            <Box>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={9}>
                                    <Typography variant="h6">{item.menuItem.name}</Typography>
                                    <Typography>Restaurant ID: {item.menuItem.restaurantId}</Typography>
                                    <Typography>Menu ID: {item.menuItem.id}</Typography>
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
                <Button variant="contained" sx={{ mr: 1 }} onClick={handlePlaceOrder}>Place Order</Button>
            </Box>
        </Box>
    );
};

export default UserCart;
