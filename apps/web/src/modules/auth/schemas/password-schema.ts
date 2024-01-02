import { z } from 'zod';

export const passwordSchema = z
  .string({ required_error: 'A senha é obrigatória' })
  .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  .max(180, { message: 'A senha deve ter no máximo 180 caracteres' })
  .refine((value) => value.trim().length > 0, {
    message: 'A senha é obrigatória',
  })
  .refine((value) => value.charCodeAt(0) !== 32, {
    message: 'A senha não pode começar com espaço',
  });
