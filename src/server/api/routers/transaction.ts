import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

type TSortParsed = Array<
  | {
      field: string;
      sort: string;
    }
  | undefined
>;

const generateSort = (sort: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sortParsed: TSortParsed = JSON.parse(sort);
  return sortParsed
    .filter((item) => item !== null)
    .map((item) => ({ [item!.field]: item!.sort }));
};

export const transactionRouter = createTRPCRouter({
  getTransactions: publicProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
        sort: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const sortFormatted = generateSort(input.sort);
      const transactions = await ctx.prisma.transaction.findMany({
        skip: input.page * input.pageSize,
        take: input.pageSize,
        orderBy: sortFormatted,
      });
      const totalTransactions = await ctx.prisma.transaction.count();
      return { data: transactions, total: totalTransactions };
    }),
  getUserPerformance: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const transactions = await ctx.prisma.transaction.findMany({
        where: { AffiliateStats: { some: { userId: input.id } } },
      });
      return {
        data: transactions,
      };
    }),
});
