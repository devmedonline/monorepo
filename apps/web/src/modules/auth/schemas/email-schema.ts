import { z } from "zod";

export const emailSchema = z
  .string({ required_error: "Campo obrigatório" })
  .email({ message: "Insira um e-mail válido" })
  .min(15, { message: "O e-mail deve ter no mínimo 15 caracteres" })
  .max(180, { message: "O e-mail deve ter no máximo 180 caracteres" })
  .refine((value) => value.trim().length > 0, { message: "O e-mail é obrigatório" });
