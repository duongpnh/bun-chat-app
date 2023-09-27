import { BearerOptions } from "@elysiajs/bearer";


export const authMiddleware = (context: any) => {
  console.log('authmiddelware', context.bearer);

  // return context.req;
  return context;
};