import { z } from 'zod';
import { passwordSchema } from './password-schema';

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório' })
    .email({ message: 'O email deve ser válido' }),
  password: passwordSchema,
});
