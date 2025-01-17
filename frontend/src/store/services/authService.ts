import { api } from "../api";

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    token: string;
    user: unknown;
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
