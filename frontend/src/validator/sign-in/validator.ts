import { z } from "zod";

export const SchemaSignIn = z.object({
  email: z
    .email({ message: "Email inválido" })
    .min(1, { message: "Campo do email não pode estar vazio" }),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(1, { message: "Campo da senha não pode estar vazio" })
    .max(8, { message: "A senha não pode ter mais de 8 caracteres" }),
});