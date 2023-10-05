import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const emailSchema = z.object({
  email: z.string().email(),
});