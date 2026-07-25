import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContactSubmission } from "./db";
import { notifyOwner } from "./_core/notification";
import { indexnowRouter } from "./routers/indexnow";

export const appRouter = router({
  system: systemRouter,
  indexnow: indexnowRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email address"),
          company: z.string().min(1, "Company is required"),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Save to database
          await createContactSubmission({
            name: input.name,
            email: input.email,
            company: input.company,
            message: input.message,
          });

          // Notify owner
          await notifyOwner({
            title: `New Contact Form Submission from ${input.name}`,
            content: `A new inquiry has been received from ${input.company}.\n\nEmail: ${input.email}\n\nMessage: ${input.message}`,
          });

          return {
            success: true,
            message: "Thank you for your inquiry. We will get back to you soon.",
          };
        } catch (error) {
          console.error("Error submitting contact form:", error);
          throw new Error("Failed to submit contact form");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
