import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import axios from "axios";

// Mock the database functions
vi.mock("./db", () => ({
  getIndexNowSettings: vi.fn().mockResolvedValue({
    id: 1,
    apiKey: "20d9bc2cd3fd486a8fd9c9ef33f1cb20",
    autoSubmit: 0,
  }),
  updateIndexNowSettings: vi.fn().mockResolvedValue(undefined),
  addIndexNowSubmission: vi.fn().mockResolvedValue(undefined),
  getIndexNowSubmissions: vi.fn().mockResolvedValue([]),
}));

// Mock axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

function createContext(host = "localhost:3000", isAdmin = true): TrpcContext {
  return {
    user: isAdmin ? { id: 1, username: "admin", role: "admin" } as any : null,
    req: {
      protocol: "http",
      headers: {
        host: host,
      },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("indexnow router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getSettings returns correct key configuration", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.indexnow.getSettings();

    expect(result.success).toBe(true);
    expect(result.settings?.apiKey).toBe("20d9bc2cd3fd486a8fd9c9ef33f1cb20");
    expect(result.settings?.autoSubmit).toBe(false);
  });

  it("updateSettings modifies configurations", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.indexnow.updateSettings({
      apiKey: "1234567890abcdef1234567890abcdef",
      autoSubmit: true,
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("updated successfully");
  });

  it("getSiteUrls returns correctly formatted paths", async () => {
    const ctx = createContext("Skavelon.com");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.indexnow.getSiteUrls();

    expect(result.baseUrl).toBe("https://Skavelon.com");
    expect(result.urls).toContain("https://Skavelon.com/");
    expect(result.urls).toContain("https://Skavelon.com/contact");
  });

  it("verifyHosting returns success when file resolves correctly", async () => {
    const ctx = createContext("localhost:3000");
    const caller = appRouter.createCaller(ctx);

    // Mock axios.get to return status 200 with the key
    const mockKey = "20d9bc2cd3fd486a8fd9c9ef33f1cb20";
    (axios.get as any).mockResolvedValueOnce({
      status: 200,
      data: mockKey,
    });

    const result = await caller.indexnow.verifyHosting({
      apiKey: mockKey,
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("verified successfully");
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:3000/${mockKey}.txt`,
      expect.any(Object)
    );
  });

  it("verifyHosting returns failure when file returns mismatching content", async () => {
    const ctx = createContext("localhost:3000");
    const caller = appRouter.createCaller(ctx);

    const mockKey = "20d9bc2cd3fd486a8fd9c9ef33f1cb20";
    (axios.get as any).mockResolvedValueOnce({
      status: 200,
      data: "different-key-content",
    });

    const result = await caller.indexnow.verifyHosting({
      apiKey: mockKey,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("did not match");
  });

  it("submitUrls calls IndexNow global API and logs response status", async () => {
    const ctx = createContext("Skavelon.com");
    const caller = appRouter.createCaller(ctx);

    (axios.post as any).mockResolvedValueOnce({
      status: 200,
      statusText: "OK",
    });

    const mockKey = "20d9bc2cd3fd486a8fd9c9ef33f1cb20";
    const testUrls = ["https://Skavelon.com/", "https://Skavelon.com/about"];

    const result = await caller.indexnow.submitUrls({
      urls: testUrls,
      apiKey: mockKey,
      host: "Skavelon.com",
    });

    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
    expect(axios.post).toHaveBeenCalledWith(
      "https://api.indexnow.org/indexnow",
      expect.objectContaining({
        host: "Skavelon.com",
        key: mockKey,
        urlList: testUrls,
      }),
      expect.any(Object)
    );
  });
});
