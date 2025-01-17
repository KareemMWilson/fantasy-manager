import { z } from 'zod';

export const teamSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export type TeamInput = z.infer<typeof teamSchema>; 