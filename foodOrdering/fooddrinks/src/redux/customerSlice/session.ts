import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  role: 'adminAdmin' | 'admin' | 'user';
  name: string;
  address: string;
}

interface SessionState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: SessionState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      console.log('User logged in:', state.user);
    },
    clearSession(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
