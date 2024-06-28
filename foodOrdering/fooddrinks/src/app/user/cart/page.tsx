"use client";

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearCart, removeFromCart, selectCartItems, selectTotalAmount } from '@/redux/customerSlice/cartReducer';
import { Box, Typography, Button, Paper, Grid, Divider, Avatar } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/ui/user/navbar/NarBar';


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
    const [userId, setUserId] = useState<string | null>(null);

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
        if (!user) {
            setError("User not logged in");
            return;
        }

        try {
            const orderItems = cartItems.map(item => ({
                menuItem: item.menuItem.id,
                quantity: item.quantity
            }));

            const orderData = {
                customer: user.id,
                items: orderItems,
                totalAmount: totalAmount
            };

            // Send POST request to add order
            const response = await axios.post('http://localhost:3007/addorder', orderData);

            if (response.status === 201) {
                console.log('Order placed successfully', response.data);

                // Clear the cart
                dispatch(clearCart());

                // Navigate to user page
                router.push(`/user`);
            } else {
                throw new Error("Failed to place order");
            }
        } catch (error) {
            console.error("Failed to place order", error);
            setError("Failed to place order");
        }
    };

    const combinedClickHandler = async () => {
        try {
            for (const item of cartItems) {
                await handleUpdate(item.menuItem.id, item.quantity);
            }
            await handlePlaceOrder();
        } catch (error) {
            setError("error");
            console.log(error);
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <><Navbar setUserId={setUserId} />
            <Box p={4} maxWidth="md" mx="auto" sx={{ borderRadius: 2, boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)' }}>
                <Typography variant="h4" gutterBottom>Your Cart</Typography>
                {user && (
                    <Box mb={2} p={2} component={Paper} sx={{ backgroundColor: '#fff0f6', boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)' }}>
                        <Typography variant="subtitle1">User: {user.name}</Typography>
                        {/* <Typography variant="subtitle1">Email: {user.email}</Typography> */}
                        <Typography variant="subtitle1">Address: {user.address}</Typography>
                        {/* <Typography variant="subtitle1">ID: {user.id}</Typography> */}
                    </Box>
                )}
                <Box>
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, backgroundColor: '#fff0f6', boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)' }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={2}>
                                        <Avatar src="/pizzas.png" alt={item.menuItem.name} variant="square" sx={{ width: 56, height: 56 }} />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6">{item.menuItem.name}</Typography>
                                        <Typography variant="body2">Restaurant ID: {item.menuItem.restaurantId}</Typography>
                                        <Typography variant="body2">Menu ID: {item.menuItem.id}</Typography>
                                        <Typography variant="body2">Price: ${item.menuItem.price.toFixed(2)}</Typography>
                                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                    </Grid>
                                    <Grid item xs={2} textAlign="right">
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
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" align="right">Total Amount: ${totalAmount.toFixed(2)}</Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2, boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)' }} onClick={combinedClickHandler}>
                        Place Order
                    </Button>
                </Box>
            </Box></>
    );
};

export default UserCart;
