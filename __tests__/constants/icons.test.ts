import { IconKey, icons } from "@/constants/icons";

describe("icons", () => {
  it("exports icons as an object", () => {
    expect(typeof icons).toBe("object");
    expect(icons).not.toBeNull();
  });

  it("contains all required navigation tab icons", () => {
    expect(icons).toHaveProperty("home");
    expect(icons).toHaveProperty("wallet");
    expect(icons).toHaveProperty("setting");
    expect(icons).toHaveProperty("activity");
  });

  it("contains all utility/action icons", () => {
    expect(icons).toHaveProperty("add");
    expect(icons).toHaveProperty("back");
    expect(icons).toHaveProperty("menu");
    expect(icons).toHaveProperty("plus");
  });

  it("contains all subscription service icons", () => {
    expect(icons).toHaveProperty("notion");
    expect(icons).toHaveProperty("dropbox");
    expect(icons).toHaveProperty("openai");
    expect(icons).toHaveProperty("adobe");
    expect(icons).toHaveProperty("medium");
    expect(icons).toHaveProperty("figma");
    expect(icons).toHaveProperty("spotify");
    expect(icons).toHaveProperty("github");
    expect(icons).toHaveProperty("claude");
    expect(icons).toHaveProperty("canva");
  });

  it("has exactly 18 icon entries", () => {
    expect(Object.keys(icons)).toHaveLength(18);
  });

  it("each icon value is defined (not null or undefined)", () => {
    Object.entries(icons).forEach(([key, value]) => {
      expect(value).toBeDefined();
      expect(value).not.toBeNull();
    });
  });

  it("all icon keys are strings", () => {
    Object.keys(icons).forEach((key) => {
      expect(typeof key).toBe("string");
    });
  });

  it("includes canva icon (newly added in this PR)", () => {
    expect(icons.canva).toBeDefined();
    expect(icons.canva).not.toBeNull();
  });
});

describe("IconKey type", () => {
  it("type check: valid icon keys are assignable to IconKey", () => {
    const validKey: IconKey = "home";
    expect(validKey).toBe("home");
  });

  it("all icon object keys match expected IconKey values", () => {
    const expectedKeys: IconKey[] = [
      "home",
      "wallet",
      "setting",
      "activity",
      "add",
      "back",
      "menu",
      "plus",
      "notion",
      "dropbox",
      "openai",
      "adobe",
      "medium",
      "figma",
      "spotify",
      "github",
      "claude",
      "canva",
    ];
    expectedKeys.forEach((key) => {
      expect(icons).toHaveProperty(key);
    });
    expect(Object.keys(icons)).toHaveLength(expectedKeys.length);
  });
});