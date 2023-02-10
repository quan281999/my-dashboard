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
});
