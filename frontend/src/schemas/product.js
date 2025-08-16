import { Description } from "@radix-ui/react-dialog";
import z from "zod";
import { createDropdownSchema, createImageSchema, createNumberSchema, createPercentageSchema, createStringSchema } from ".";

export const productSchema = z.object({
    title: createStringSchema(),
    description: createStringSchema(),
    // prod_image: createImageSchema(),
    category: createDropdownSchema(),
    price: createNumberSchema(),
    discountPercentage: createPercentageSchema(),
    stock: createNumberSchema()
})