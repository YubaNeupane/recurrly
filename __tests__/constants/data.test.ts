import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
  tabs,
} from "@/constants/data";
import { icons } from "@/constants/icons";

describe("tabs", () => {
  it("exports tabs as an array", () => {
    expect(Array.isArray(tabs)).toBe(true);
  });

  it("has exactly 4 tabs", () => {
    expect(tabs).toHaveLength(4);
  });

  it("contains all required tab names", () => {
    const names = tabs.map((t) => t.name);
    expect(names).toContain("index");
    expect(names).toContain("subscriptions");
    expect(names).toContain("insights");
    expect(names).toContain("settings");
  });

  it("each tab has required properties: name, title, icon", () => {
    tabs.forEach((tab) => {
      expect(tab).toHaveProperty("name");
      expect(tab).toHaveProperty("title");
      expect(tab).toHaveProperty("icon");
      expect(typeof tab.name).toBe("string");
      expect(typeof tab.title).toBe("string");
      expect(tab.icon).toBeDefined();
    });
  });

  it("tabs have correct titles", () => {
    const titlesMap: Record<string, string> = {
      index: "Home",
      subscriptions: "Subscriptions",
      insights: "Insights",
      settings: "Settings",
    };
    tabs.forEach((tab) => {
      expect(tab.title).toBe(titlesMap[tab.name]);
    });
  });

  it("tabs use the correct icons from the icons module", () => {
    const homeTab = tabs.find((t) => t.name === "index");
    const subscriptionsTab = tabs.find((t) => t.name === "subscriptions");
    const insightsTab = tabs.find((t) => t.name === "insights");
    const settingsTab = tabs.find((t) => t.name === "settings");

    expect(homeTab?.icon).toBe(icons.home);
    expect(subscriptionsTab?.icon).toBe(icons.wallet);
    expect(insightsTab?.icon).toBe(icons.activity);
    expect(settingsTab?.icon).toBe(icons.setting);
  });

  it("tab names are unique", () => {
    const names = tabs.map((t) => t.name);
    const unique = new Set(names);
    expect(unique.size).toBe(tabs.length);
  });
});

describe("HOME_USER", () => {
  it("has a name property", () => {
    expect(HOME_USER).toHaveProperty("name");
  });

  it("name is a non-empty string", () => {
    expect(typeof HOME_USER.name).toBe("string");
    expect(HOME_USER.name.length).toBeGreaterThan(0);
  });

  it("has correct user name", () => {
    expect(HOME_USER.name).toBe("Adrian | JS Mastery");
  });
});

describe("HOME_BALANCE", () => {
  it("has amount and nextRenewalDate properties", () => {
    expect(HOME_BALANCE).toHaveProperty("amount");
    expect(HOME_BALANCE).toHaveProperty("nextRenewalDate");
  });

  it("amount is a positive number", () => {
    expect(typeof HOME_BALANCE.amount).toBe("number");
    expect(HOME_BALANCE.amount).toBeGreaterThan(0);
  });

  it("amount has correct value", () => {
    expect(HOME_BALANCE.amount).toBe(2489.48);
  });

  it("nextRenewalDate is a valid ISO date string", () => {
    expect(typeof HOME_BALANCE.nextRenewalDate).toBe("string");
    const date = new Date(HOME_BALANCE.nextRenewalDate);
    expect(date.toString()).not.toBe("Invalid Date");
  });

  it("nextRenewalDate has correct value", () => {
    expect(HOME_BALANCE.nextRenewalDate).toBe("2026-03-18T09:00:00.000Z");
  });
});

describe("UPCOMING_SUBSCRIPTIONS", () => {
  it("exports as an array", () => {
    expect(Array.isArray(UPCOMING_SUBSCRIPTIONS)).toBe(true);
  });

  it("has exactly 3 upcoming subscriptions", () => {
    expect(UPCOMING_SUBSCRIPTIONS).toHaveLength(3);
  });

  it("each subscription has required fields", () => {
    UPCOMING_SUBSCRIPTIONS.forEach((sub) => {
      expect(sub).toHaveProperty("id");
      expect(sub).toHaveProperty("icon");
      expect(sub).toHaveProperty("name");
      expect(sub).toHaveProperty("price");
      expect(sub).toHaveProperty("currency");
      expect(sub).toHaveProperty("daysLeft");
    });
  });

  it("all prices are positive numbers", () => {
    UPCOMING_SUBSCRIPTIONS.forEach((sub) => {
      expect(typeof sub.price).toBe("number");
      expect(sub.price).toBeGreaterThan(0);
    });
  });

  it("all daysLeft values are positive integers", () => {
    UPCOMING_SUBSCRIPTIONS.forEach((sub) => {
      expect(typeof sub.daysLeft).toBe("number");
      expect(sub.daysLeft).toBeGreaterThan(0);
      expect(Number.isInteger(sub.daysLeft)).toBe(true);
    });
  });

  it("all ids are unique strings", () => {
    const ids = UPCOMING_SUBSCRIPTIONS.map((s) => s.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(UPCOMING_SUBSCRIPTIONS.length);
  });

  it("all currencies are non-empty strings", () => {
    UPCOMING_SUBSCRIPTIONS.forEach((sub) => {
      expect(typeof sub.currency).toBe("string");
      expect(sub.currency!.length).toBeGreaterThan(0);
    });
  });

  it("contains spotify, notion, and figma subscriptions", () => {
    const ids = UPCOMING_SUBSCRIPTIONS.map((s) => s.id);
    expect(ids).toContain("spotify");
    expect(ids).toContain("notion");
    expect(ids).toContain("figma");
  });

  it("spotify subscription has correct data", () => {
    const spotify = UPCOMING_SUBSCRIPTIONS.find((s) => s.id === "spotify");
    expect(spotify).toBeDefined();
    expect(spotify?.name).toBe("Spotify");
    expect(spotify?.price).toBe(5.99);
    expect(spotify?.currency).toBe("USD");
    expect(spotify?.daysLeft).toBe(2);
    expect(spotify?.icon).toBe(icons.spotify);
  });

  it("notion subscription has correct data", () => {
    const notion = UPCOMING_SUBSCRIPTIONS.find((s) => s.id === "notion");
    expect(notion).toBeDefined();
    expect(notion?.name).toBe("Notion");
    expect(notion?.price).toBe(12.0);
    expect(notion?.daysLeft).toBe(4);
    expect(notion?.icon).toBe(icons.notion);
  });

  it("figma subscription has correct data", () => {
    const figma = UPCOMING_SUBSCRIPTIONS.find((s) => s.id === "figma");
    expect(figma).toBeDefined();
    expect(figma?.name).toBe("Figma");
    expect(figma?.price).toBe(15.0);
    expect(figma?.daysLeft).toBe(6);
    expect(figma?.icon).toBe(icons.figma);
  });

  it("subscriptions are ordered by daysLeft ascending", () => {
    const daysLeftValues = UPCOMING_SUBSCRIPTIONS.map((s) => s.daysLeft);
    for (let i = 1; i < daysLeftValues.length; i++) {
      expect(daysLeftValues[i]).toBeGreaterThan(daysLeftValues[i - 1]);
    }
  });
});

describe("HOME_SUBSCRIPTIONS", () => {
  it("exports as an array", () => {
    expect(Array.isArray(HOME_SUBSCRIPTIONS)).toBe(true);
  });

  it("has exactly 4 subscriptions", () => {
    expect(HOME_SUBSCRIPTIONS).toHaveLength(4);
  });

  it("each subscription has required fields", () => {
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      expect(sub).toHaveProperty("id");
      expect(sub).toHaveProperty("icon");
      expect(sub).toHaveProperty("name");
      expect(sub).toHaveProperty("price");
      expect(sub).toHaveProperty("billing");
    });
  });

  it("all prices are positive numbers", () => {
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      expect(typeof sub.price).toBe("number");
      expect(sub.price).toBeGreaterThan(0);
    });
  });

  it("all ids are unique", () => {
    const ids = HOME_SUBSCRIPTIONS.map((s) => s.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(HOME_SUBSCRIPTIONS.length);
  });

  it("contains expected subscription service ids", () => {
    const ids = HOME_SUBSCRIPTIONS.map((s) => s.id);
    expect(ids).toContain("adobe-creative-cloud");
    expect(ids).toContain("github-pro");
    expect(ids).toContain("claude-pro");
    expect(ids).toContain("canva-pro");
  });

  it("statuses are valid subscription states", () => {
    const validStatuses = ["active", "paused", "cancelled"];
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      if (sub.status !== undefined) {
        expect(validStatuses).toContain(sub.status);
      }
    });
  });

  it("includes at least one active subscription", () => {
    const activeCount = HOME_SUBSCRIPTIONS.filter((s) => s.status === "active").length;
    expect(activeCount).toBeGreaterThan(0);
  });

  it("includes a paused subscription", () => {
    const paused = HOME_SUBSCRIPTIONS.find((s) => s.status === "paused");
    expect(paused).toBeDefined();
  });

  it("includes a cancelled subscription", () => {
    const cancelled = HOME_SUBSCRIPTIONS.find((s) => s.status === "cancelled");
    expect(cancelled).toBeDefined();
  });

  it("all startDate and renewalDate fields are valid ISO date strings when present", () => {
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      if (sub.startDate) {
        const date = new Date(sub.startDate);
        expect(date.toString()).not.toBe("Invalid Date");
      }
      if (sub.renewalDate) {
        const date = new Date(sub.renewalDate);
        expect(date.toString()).not.toBe("Invalid Date");
      }
    });
  });

  it("color fields are valid hex codes when present", () => {
    const hexPattern = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/;
    HOME_SUBSCRIPTIONS.forEach((sub) => {
      if (sub.color) {
        expect(sub.color).toMatch(hexPattern);
      }
    });
  });

  it("adobe-creative-cloud has correct data", () => {
    const adobe = HOME_SUBSCRIPTIONS.find((s) => s.id === "adobe-creative-cloud");
    expect(adobe).toBeDefined();
    expect(adobe?.name).toBe("Adobe Creative Cloud");
    expect(adobe?.plan).toBe("Teams Plan");
    expect(adobe?.category).toBe("Design");
    expect(adobe?.status).toBe("active");
    expect(adobe?.price).toBe(77.49);
    expect(adobe?.currency).toBe("USD");
    expect(adobe?.billing).toBe("Monthly");
    expect(adobe?.icon).toBe(icons.adobe);
    expect(adobe?.color).toBe("#f5c542");
  });

  it("canva-pro has correct data (newly added in this PR)", () => {
    const canva = HOME_SUBSCRIPTIONS.find((s) => s.id === "canva-pro");
    expect(canva).toBeDefined();
    expect(canva?.name).toBe("Canva Pro");
    expect(canva?.plan).toBe("Yearly Access");
    expect(canva?.category).toBe("Design");
    expect(canva?.status).toBe("cancelled");
    expect(canva?.price).toBe(119.99);
    expect(canva?.currency).toBe("USD");
    expect(canva?.billing).toBe("Yearly");
    expect(canva?.icon).toBe(icons.canva);
    expect(canva?.color).toBe("#b8e8d0");
  });

  it("claude-pro has paused status", () => {
    const claude = HOME_SUBSCRIPTIONS.find((s) => s.id === "claude-pro");
    expect(claude).toBeDefined();
    expect(claude?.status).toBe("paused");
    expect(claude?.price).toBe(20.0);
    expect(claude?.icon).toBe(icons.claude);
  });

  it("github-pro has correct billing info", () => {
    const github = HOME_SUBSCRIPTIONS.find((s) => s.id === "github-pro");
    expect(github).toBeDefined();
    expect(github?.billing).toBe("Monthly");
    expect(github?.price).toBe(9.99);
    expect(github?.status).toBe("active");
    expect(github?.icon).toBe(icons.github);
  });

  it("each subscription has a unique color", () => {
    const colors = HOME_SUBSCRIPTIONS.map((s) => s.color).filter(Boolean);
    const uniqueColors = new Set(colors);
    expect(uniqueColors.size).toBe(colors.length);
  });
});