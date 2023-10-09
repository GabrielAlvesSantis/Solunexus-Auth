import * as z from "zod"

export const passwordSchema = z.object({
  password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
  passwordConfirmation: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
}).refine(data => data.password === data.passwordConfirmation, { message: "As senhas devem ser iguais",path: ['passwordConfirmation'] })