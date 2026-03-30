// // packages/adapters/src/trpc/procedures/user.procedure.ts

// import { z } from 'zod';
// import { publicProcedure } from '../router';
// import { CreateUser } from '@repo/application';

// export const createUser = publicProcedure
//   .input(z.object({ email: z.string().email() }))
//   .mutation(async ({ input, ctx }) => {
//     const useCase = new CreateUser(ctx.userRepo);

//     await useCase.execute(input.email);

//     return { success: true };
//   });