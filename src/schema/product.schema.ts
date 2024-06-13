import { object, number, string, TypeOf, boolean } from "zod";


const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string(),
    quantity: number({
      required_error: "Quantity is required",
    }),
    bought: boolean().default(false),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;