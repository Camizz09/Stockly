import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().positive("Preço deve ser maior que zero"),
  stock: z.number().int().nonnegative("Estoque não pode ser negativo"),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;