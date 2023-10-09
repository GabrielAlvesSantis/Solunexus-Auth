import * as z from "zod";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const emailExists = async (email: string) => {
  const { data } = await supabase.from("account_infos").select("email").eq("email", email);
  return data!.length > 0;
}

export const emailSchema = z.object({
  email: z.string()
  .min(1, { message: "Este campo deve ser preenchido" })
  .email({ message: "Este não é um e-mail válido." })
  .refine(emailExists, {message: "O e-mail informado não está cadastrado no sistema"})
})