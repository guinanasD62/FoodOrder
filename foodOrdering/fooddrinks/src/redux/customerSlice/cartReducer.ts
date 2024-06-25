// redux/customerSlice/cartReducer.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuItem {
    id: string;
    restaurantId: string;
    name: string;
    price: number;
    quantity: number;
    img?: string;
}

interface CartItem {
    menuItem: MenuItem;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalAmount: number;
}

const initialState: CartState = {
    items: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<MenuItem>) {
            const existingItem = state.items.find(item => item.menuItem.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ menuItem: action.payload, quantity: 1 });
            }
            state.totalAmount += action.payload.price;
        },
        removeFromCart(state, action: PayloadAction<string>) {
            const existingItemIndex = state.items.findIndex(item => item.menuItem.id === action.payload);
            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                state.totalAmount -= existingItem.menuItem.price * existingItem.quantity;
                state.items.splice(existingItemIndex, 1);
            }
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// Selector to get cart items
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

// Selector to get total amount
export const selectTotalAmount = (state: { cart: CartState }) => state.cart.totalAmount;

// Selector to get cart count
export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
