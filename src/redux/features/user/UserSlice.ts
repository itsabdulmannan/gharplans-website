// src/redux/features/user/UserSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  email: string;
  id: number;
  iat: number;
  exp: number;
}

export interface UserState {
  loggedIn: boolean;
  email?: string;
  id?: number;
  token?: string;
}

const token = localStorage.getItem('token');

let initialState: UserState = {
  loggedIn: false,
  email: undefined,
  id: undefined,
  token: undefined,
};

if (token) {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("Decoded token on init:", decoded);
    initialState = {
      loggedIn: true,
      email: decoded.email,
      id: decoded.id,
      token,
    };
  } catch (error) {
    console.error("Error decoding token on startup:", error);
    localStorage.removeItem('token');
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      const { token } = action.payload;
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        console.log("Decoded token in loginSuccess:", decoded);
        // Using mutable updates with Immer:
        state.loggedIn = true;
        state.email = decoded.email;
        state.id = decoded.id;  // This sets the id correctly.
        state.token = token;
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Error decoding token on login:", error);
      }
    },
    logout(state) {
      state.loggedIn = false;
      state.email = undefined;
      state.id = undefined;
      state.token = undefined;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
