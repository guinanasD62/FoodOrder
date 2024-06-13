// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartItem {
//   id: string;
//   orderProductimg: string;
//   orderProducttitle: string;
//   orderProductcolor: string;
//   orderProductsize: string;
//   orderProductprice: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setCart: (state, action: PayloadAction<CartItem[]>) => {
//       state.items = action.payload;
//     },
//     removeItem: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//   },
// });

// export const { setCart, removeItem } = cartSlice.actions;

// export const selectCartCount = (state: { cart: CartState }) => state.cart.items.length;

// export default cartSlice.reducer;