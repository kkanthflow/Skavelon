import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createContactSubmission: vi.fn().mockResolvedValue({ insertId: 1 }),
}));

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully submits a contact form with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      divisionOfInterest: "LePort",
      message: "I am interested in your export services for agricultural products.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Thank you");
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "invalid-email",
        company: "Acme Corp",
        divisionOfInterest: "LePort",
        message: "I am interested in your export services.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "",
        email: "john@example.com",
        company: "Acme Corp",
        divisionOfInterest: "LePort",
        message: "I am interested in your export services.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with empty company", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        company: "",
        divisionOfInterest: "LePort",
        message: "I am interested in your export services.",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with message too short", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Corp",
        divisionOfInterest: "LePort",
        message: "Short",
      })
    ).rejects.toThrow();
  });

  it("accepts all division options", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const divisions = ["LePort", "LeTech", "Both"] as const;

    for (const division of divisions) {
      const result = await caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Corp",
        divisionOfInterest: division,
        message: "I am interested in your services for this division.",
      });

      expect(result.success).toBe(true);
    }
  });
});
