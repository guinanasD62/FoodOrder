"use client";
 
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;

// import { Provider } from "react-redux";
// import { store } from "./store"
 
// export default function ReduxProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <Provider store={store}>{children}</Provider>;
// }
//customize in nextj  ||  <Provider store={store}>
// but in react no need