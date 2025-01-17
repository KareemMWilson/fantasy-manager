import { api } from '../api';

export interface AuthRequest {
  email: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation<{ token: string; user: unknown }, AuthRequest>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useAuthMutation,
} = authApi; 