import { z } from "zod";
import COUNTRY_ISO_MAPPING from "../../../data/isoMapping";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
  getUsersByGeoLocation: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({});
    const mappedLocations = users.reduce(
      (acc: Record<string, number>, { country }) => {
        const countryISO3 = COUNTRY_ISO_MAPPING[country];
        if (countryISO3 === undefined) return acc;
        else {
          if (!acc[countryISO3]) {
            acc[countryISO3] = 0;
          }
          acc[countryISO3]++;
          return acc;
        }
      },
      {}
    );
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    return { data: formattedLocations };
  }),
});
