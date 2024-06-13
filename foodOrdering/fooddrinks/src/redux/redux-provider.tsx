"use client";
 
import { Provider } from "react-redux";
import { store } from "./store"
 
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
//customize in nextj  ||  <Provider store={store}>
// but in react no need