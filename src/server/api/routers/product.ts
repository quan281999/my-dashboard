import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.product.findMany({
      include: {
        productStat: true,
      },
    });
    return { data: user };
  }),
});
