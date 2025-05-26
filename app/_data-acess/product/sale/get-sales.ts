import "server-only";

import { db } from "@/app/_lib/prisma";

export interface SaleDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
}

export const getSales = async (): Promise<SaleDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { product: true },
      },
    },
  });
  return sales.map((sales) => ({
    id: sales.id,
    date: sales.date,
    productNames: sales.saleProducts
      .map((saleProduct) => saleProduct.product.name)
      .join(" • "),
    totalAmount: sales.saleProducts.reduce(
      (acc, saleProduct) =>
        acc + saleProduct.quantity * Number(saleProduct.unitPrice),
      0,
    ),
    totalProducts: sales.saleProducts.reduce(
      (acc, saleProduct) => acc + saleProduct.quantity,
      0,
    ),
  }));
};
