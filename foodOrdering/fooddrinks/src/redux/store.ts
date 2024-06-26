import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // defaults to sessionStorage for web
import sessionReducer from './customerSlice/session';
import cartReducer from './customerSlice/cartReducer';

//
const persistConfig = {
    key: 'root', // A unique key that identifies this storage
    storage: storageSession, // Specifies that we want to use sessionStorage for storing the state
};

const persistedReducer = persistReducer(persistConfig, sessionReducer);

export const store = configureStore({
    reducer: {
        session: persistedReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

//
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
