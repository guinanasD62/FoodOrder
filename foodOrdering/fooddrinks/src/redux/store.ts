// store.ts
import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './customerSlice/cartReducer';
import sessionReducer from './customerSlice/session';

export const store = configureStore({
    reducer: {
        session: sessionReducer
        // cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
