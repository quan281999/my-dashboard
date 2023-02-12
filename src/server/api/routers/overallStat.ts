import { createTRPCRouter, publicProcedure } from "../trpc";

export const overallStatRouter = createTRPCRouter({
  getOverallStat: publicProcedure.query(async ({ ctx }) => {
    const overallStat = await ctx.prisma.overallStat.findFirst();
    return { data: overallStat };
  }),
});
