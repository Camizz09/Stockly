import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";

// Segurança melhor para Chamar o user e não vazar a Password no Navegador
// Função está sendo retornada na page do Products

export const getProducts = async (): Promise<Product[]> => {
  return db.product.findMany({});
};
