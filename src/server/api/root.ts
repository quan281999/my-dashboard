import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { productRouter } from "./routers/product";
import { transactionRouter } from "./routers/transaction";
import { overallStatRouter } from "./routers/overallStat";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  product: productRouter,
  transaction: transactionRouter,
  overallStat: overallStatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
