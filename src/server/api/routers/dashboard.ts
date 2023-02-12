import { createTRPCRouter, publicProcedure } from "../trpc";

export const dashboardRouter = createTRPCRouter({
  getDashboard: publicProcedure.query(async ({ ctx }) => {
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    const [transactions, overallStat] = await Promise.all([
      ctx.prisma.transaction.findMany({
        take: 50,
        orderBy: { createdAt: "desc" },
      }),
      ctx.prisma.overallStat.findFirst({
        where: { year: currentYear },
      }),
    ]);

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat!;

    const thisMonthStats = overallStat!.monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat!.dailyData.find(({ date }) => {
      return date === currentDay;
    });

    return {
      data: {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
      },
    };
  }),
});
