// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from "axios";
 


// export interface Product {
//   _id: Key | null | undefined;
//   id: string;
//   img: string;
//   title: string;
//   desc: string;
//   price: number;
//   stock: number;
//   createdAt: any;
//   color: string;
//   size: string;
//   //color size address
// }

// export interface CartItem extends Product {
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: []
// };

// //action should be inside of the reducer || action are plain js object that have a type "field"
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     //reducer function specifies the state changes in response to actions
//     addToCart: (state, action: PayloadAction<Product>) => {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     }
//   }
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;

// export const selectCartCount = (state: { cart: CartState }) => state.cart.items.reduce((count, item) => count + item.quantity, 0);
// export const selectTotalPrice = (state: { cart: CartState }) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

// export default cartSlice.reducer;
