import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      include: {
        productStat: true,
      },
    });
    return { data: products };
  }),
});
