import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUserInfo: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.id },
        select: { name: true, email: true, occupation: true },
      });
      return { data: user };
    }),
  getCustomers: publicProcedure.query(async ({ ctx }) => {
    const customers = await ctx.prisma.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        country: true,
        occupation: true,
        role: true,
      },
    });
    return {
      data: customers,
    };
  }),
});
