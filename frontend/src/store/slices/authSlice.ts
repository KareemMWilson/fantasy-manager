import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string
  email: string
  budget: number
}

export interface AuthState {
  token: string | null;
  user: User | null
  isAuthenticated: boolean;
  isNewUser: boolean
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isNewUser: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; isNewUser: boolean}>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isNewUser = true
    },
    setIsNewUser: (state, action:PayloadAction<boolean> ) => {
      state.isNewUser = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout, setIsNewUser } = authSlice.actions;
export default authSlice.reducer; 