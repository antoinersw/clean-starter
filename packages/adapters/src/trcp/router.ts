// // packages/adapters/src/trpc/router.ts

// import { initTRPC } from '@trpc/server';
// import { createUser } from './procedures/user.procedure';
// import { Context } from './context';

// const t = initTRPC.context<Context>().create();

// export const router = t.router;
// export const publicProcedure = t.procedure;

// export const appRouter = router({
//   createUser
// });

// export type AppRouter = typeof appRouter;