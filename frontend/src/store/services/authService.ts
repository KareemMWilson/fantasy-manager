import { api } from "../api";
import { User } from "../slices/authSlice";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    token: string;
    user: User;
    isNewUser: boolean
  };
  success: boolean;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useAuthMutation } = authApi;
