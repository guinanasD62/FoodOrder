"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../redux/store';
import { loginSuccess, clearSession } from '../redux/customerSlice/session';

type User = {
  id: string;
  email: string;
  role: 'adminAdmin' | 'admin' | 'user';
  name: string;
  address: string;
};


type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  //session: persistedReducer, // Use the persisted reducer from store.ts
  const { token, isAuthenticated, user } = useSelector((state: RootState) => state.session);
  const router = useRouter();

  const login = (token: string, user: User) => {
    dispatch(loginSuccess({ token, user }));
  };

  const logout = () => {
    dispatch(clearSession());
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
