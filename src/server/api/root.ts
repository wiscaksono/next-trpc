import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { notesRouter } from "./routers/notes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  notes: notesRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
