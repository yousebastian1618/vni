import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'password must be at least 8 characters')
});

export type RegisterInput = z.infer<typeof registerSchema>;