// import { RootState } from '@/redux/store';
// import { Button } from '@mui/material'
// import React from 'react'
// import { useSelector } from 'react-redux';

// interface CartItem {
//     _id: string;
//     id: string; // this is needed
//     name: string;
//     description?: string;
//     price: number;
//     quantity: number;
//     img?: string;
//     restaurant: string;
//     restaurantId: string;
//     category?: string;
//     restaurantName?: string;
// }

// interface OrderData {
//     totalAmount: number;

// }

// const OrderPage = () => {
//     const isAuthenticated = useSelector((state: any) => state.session.isAuthenticated);
//     // const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];

//     const handlePlaceOrder = async () => {
//         if (!isAuthenticated) {
//             console.error('User is not logged in');
//             return;
//         }


//         try {
//             const orderData: OrderData = {
//                 customerId: user.id,
//                 menu: cartItems.map(item => ({
//                     product: item._id,
//                     size: item.size,
//                     quantity: item.quantity,
//                 })),
//                 address,
//                 totalAmount,
//             };
//         }
//     }
//     return (
//         <div>

//             <Button variant="contained" sx={{ mr: 1 }} onClick={handlePlaceOrder}>Place Order</Button>
//         </div>
//     )
// }

// export default OrderPage