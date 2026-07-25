import { z } from "zod";
import axios from "axios";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getIndexNowSettings,
  updateIndexNowSettings,
  addIndexNowSubmission,
  getIndexNowSubmissions,
} from "../db";

export const indexnowRouter = router({
  getSettings: publicProcedure.query(async () => {
    try {
      const settings = await getIndexNowSettings();
      return {
        success: true,
        settings: {
          apiKey: settings.apiKey,
          autoSubmit: settings.autoSubmit === 1,
        },
      };
    } catch (error) {
      console.error("[IndexNow] Failed to fetch settings:", error);
      return {
        success: false,
        error: "Failed to load settings.",
      };
    }
  }),

  // Admin only: update IndexNow API key and auto-submit settings
  updateSettings: adminProcedure
    .input(
      z.object({
        apiKey: z.string().min(32, "Key must be at least 32 characters").max(255),
        autoSubmit: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await updateIndexNowSettings(input.apiKey, input.autoSubmit);
        return {
          success: true,
          message: "Settings updated successfully.",
        };
      } catch (error) {
        console.error("[IndexNow] Failed to update settings:", error);
        throw new Error("Failed to save settings.");
      }
    }),

  // Admin only: verify the key file is publicly accessible
  verifyHosting: adminProcedure
    .input(z.object({ apiKey: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const host = ctx.req.headers.host || "localhost:3000";
      // Determine protocol: req.secure or headers, default to http for localhost and https for production
      const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
      const protocol = isLocal ? "http" : "https";
      
      const verificationUrl = `${protocol}://${host}/${input.apiKey}.txt`;

      try {
        console.log(`[IndexNow] Verifying hosting at: ${verificationUrl}`);
        const response = await axios.get(verificationUrl, {
          timeout: 5000,
          headers: { "User-Agent": "IndexNowVerifier/1.0" },
        });

        const content = typeof response.data === "string" ? response.data.trim() : String(response.data).trim();
        
        if (response.status === 200 && content === input.apiKey) {
          return {
            success: true,
            url: verificationUrl,
            message: "Key verified successfully! File is hosted and accessible.",
          };
        }

        return {
          success: false,
          url: verificationUrl,
          error: `Verification failed. Content returned did not match key. Expected "${input.apiKey}", but got "${content.slice(0, 100)}"`,
        };
      } catch (error: any) {
        console.error("[IndexNow] Key file verification failed:", error.message);
        return {
          success: false,
          url: verificationUrl,
          error: `Could not reach verification file. Network error: ${error.message}`,
        };
      }
    }),

  // Admin only: submit URLs to IndexNow
  submitUrls: adminProcedure
    .input(
      z.object({
        urls: z.array(z.string().url("Must be a valid URL")),
        apiKey: z.string().min(1),
        host: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { urls, apiKey, host } = input;
      const protocol = host.includes("localhost") ? "http" : "https";
      const keyLocation = `${protocol}://${host}/${apiKey}.txt`;

      try {
        console.log(`[IndexNow] Submitting ${urls.length} URLs to IndexNow for host ${host}`);
        
        // POST to the global IndexNow endpoint which propagates to Bing, Yandex, etc.
        const response = await axios.post(
          "https://api.indexnow.org/indexnow",
          {
            host: host,
            key: apiKey,
            keyLocation: keyLocation,
            urlList: urls,
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            timeout: 10000,
          }
        );

        const status = response.status;
        const responseMessage = `Submitted successfully. Status: ${status} ${response.statusText || ""}`;
        
        // Log to database
        await addIndexNowSubmission(urls, apiKey, status, responseMessage);

        return {
          success: true,
          status,
          message: responseMessage,
        };
      } catch (error: any) {
        const status = error.response?.status || -1;
        const errorMsg = error.response?.data
          ? (typeof error.response.data === "string" ? error.response.data : JSON.stringify(error.response.data))
          : error.message;
        
        const responseMessage = `Submission failed. Status: ${status}. Error: ${errorMsg}`;
        console.error("[IndexNow] Submission request failed:", responseMessage);

        // Log to database even if it failed
        await addIndexNowSubmission(urls, apiKey, status, responseMessage);

        return {
          success: false,
          status,
          error: responseMessage,
        };
      }
    }),

  getSubmissions: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      try {
        const logs = await getIndexNowSubmissions(input.limit, input.offset);
        return {
          success: true,
          logs: logs.map(log => ({
            id: log.id,
            urls: log.urls.split("\n"),
            apiKey: log.apiKey,
            status: log.status,
            responseMessage: log.responseMessage,
            createdAt: log.createdAt,
          })),
        };
      } catch (error) {
        console.error("[IndexNow] Failed to load submissions:", error);
        return {
          success: false,
          error: "Failed to retrieve logs.",
        };
      }
    }),

  getSiteUrls: publicProcedure.query(async ({ ctx }) => {
    const host = ctx.req.headers.host || "localhost:3000";
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
    const protocol = isLocal ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    // Define the application's page routes
    const paths = [
      "/",
      "/about",
      "/leport",
      "/cybersecurity",
      "/services",
      "/global-reach",
      "/contact",
    ];

    return {
      baseUrl,
      urls: paths.map(path => `${baseUrl}${path}`),
    };
  }),
});
