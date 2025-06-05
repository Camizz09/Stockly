"use server";

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    try {
      await db.$transaction(async (trx) => {
        // Verificar estoque de todos os produtos primeiro
        for (const product of products) {
          const productFromDb = await trx.product.findUnique({
            where: { id: product.id },
          });
          
          if (!productFromDb) {
            returnValidationErrors(upsertSaleSchema, {
              _errors: ["Produto não encontrado."],
            });
          }
          
          const productIsOutOfStock = product.quantity > productFromDb.stock;
          if (productIsOutOfStock) {
            returnValidationErrors(upsertSaleSchema, {
              _errors: [`Produto ${productFromDb.name} sem estoque suficiente.`],
            });
          }
        }

        if (id) {
          const existingSale = await trx.sale.findUnique({
            where: { id },
            include: { saleProducts: true },
          });
          
          if (!existingSale) {
            returnValidationErrors(upsertSaleSchema, {
              _errors: ["Venda não encontrada."],
            });
          }
          
          // Estornar estoque da venda anterior
          await trx.sale.delete({ where: { id } });
          for (const product of existingSale.saleProducts) {
            await trx.product.update({
              where: { id: product.productId },
              data: { stock: { increment: product.quantity } },
            });
          }
        }

        // Criar nova venda
        const sale = await trx.sale.create({
          data: { date: new Date() },
        });

        // Processar produtos da venda
        for (const product of products) {
          const productFromDb = await trx.product.findUnique({
            where: { id: product.id },
          });

          await trx.saleProduct.create({
            data: {
              saleId: sale.id,
              productId: product.id,
              quantity: product.quantity,
              unitPrice: productFromDb.price,
            },
          });

          await trx.product.update({
            where: { id: product.id },
            data: { stock: { decrement: product.quantity } },
          });
        }
      });

      revalidatePath("/products");
      revalidatePath("/sales");
      revalidatePath("/");
      
      return { success: true };
    } catch (error) {
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error("Erro ao processar venda");
    }
  });