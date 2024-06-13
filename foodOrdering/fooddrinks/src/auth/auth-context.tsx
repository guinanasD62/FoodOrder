"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router
import { RootState } from '../redux/store';
import { loginSuccess, clearSession } from '../redux/customerSlice/session'; // Ensure the correct path

type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  login: (token: string, user: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user } = useSelector((state: RootState) => state.session);
  const router = useRouter();

  const login = (token: string, user: any) => {
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
