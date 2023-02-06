import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  getNotes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.notes.findMany();
  }),

  createNotes: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.notes.create({
          data: {
            title: input.title,
            content: input.content,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  updateNotes: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.notes.update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            content: input.content,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  deleteNotes: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.notes.delete({
          where: {
            id: input.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
