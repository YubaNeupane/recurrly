import { colors, components, spacing, theme } from "@/constants/theme";

describe("colors", () => {
  it("has all required color keys", () => {
    expect(colors).toHaveProperty("background");
    expect(colors).toHaveProperty("foreground");
    expect(colors).toHaveProperty("card");
    expect(colors).toHaveProperty("muted");
    expect(colors).toHaveProperty("mutedForeground");
    expect(colors).toHaveProperty("primary");
    expect(colors).toHaveProperty("accent");
    expect(colors).toHaveProperty("border");
    expect(colors).toHaveProperty("success");
    expect(colors).toHaveProperty("destructive");
    expect(colors).toHaveProperty("subscription");
  });

  it("uses valid hex color values for solid colors", () => {
    const hexColorPattern = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/;
    expect(colors.background).toMatch(hexColorPattern);
    expect(colors.foreground).toMatch(hexColorPattern);
    expect(colors.card).toMatch(hexColorPattern);
    expect(colors.muted).toMatch(hexColorPattern);
    expect(colors.primary).toMatch(hexColorPattern);
    expect(colors.accent).toMatch(hexColorPattern);
    expect(colors.success).toMatch(hexColorPattern);
    expect(colors.destructive).toMatch(hexColorPattern);
    expect(colors.subscription).toMatch(hexColorPattern);
  });

  it("uses valid rgba values for semi-transparent colors", () => {
    const rgbaPattern = /^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/;
    expect(colors.mutedForeground).toMatch(rgbaPattern);
    expect(colors.border).toMatch(rgbaPattern);
  });

  it("has the correct specific color values", () => {
    expect(colors.background).toBe("#fff9e3");
    expect(colors.foreground).toBe("#081126");
    expect(colors.card).toBe("#fff8e7");
    expect(colors.muted).toBe("#f6eecf");
    expect(colors.mutedForeground).toBe("rgba(0, 0, 0, 0.6)");
    expect(colors.primary).toBe("#081126");
    expect(colors.accent).toBe("#ea7a53");
    expect(colors.border).toBe("rgba(0, 0, 0, 0.1)");
    expect(colors.success).toBe("#16a34a");
    expect(colors.destructive).toBe("#dc2626");
    expect(colors.subscription).toBe("#8fd1bd");
  });

  it("foreground and primary share the same dark color", () => {
    expect(colors.foreground).toBe(colors.primary);
  });
});

describe("spacing", () => {
  it("has all required spacing keys", () => {
    const expectedKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30];
    expectedKeys.forEach((key) => {
      expect(spacing).toHaveProperty(String(key));
    });
  });

  it("spacing values are multiples of 4", () => {
    Object.values(spacing).forEach((value) => {
      expect(value % 4).toBe(0);
    });
  });

  it("spacing values are non-negative numbers", () => {
    Object.values(spacing).forEach((value) => {
      expect(typeof value).toBe("number");
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });

  it("has the correct specific spacing values", () => {
    expect(spacing[0]).toBe(0);
    expect(spacing[1]).toBe(4);
    expect(spacing[2]).toBe(8);
    expect(spacing[4]).toBe(16);
    expect(spacing[5]).toBe(20);
    expect(spacing[8]).toBe(32);
    expect(spacing[12]).toBe(48);
    expect(spacing[18]).toBe(72);
    expect(spacing[30]).toBe(120);
  });

  it("spacing values increase monotonically with their keys", () => {
    const entries = Object.entries(spacing)
      .map(([k, v]) => [Number(k), v] as [number, number])
      .sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i][1]).toBeGreaterThan(entries[i - 1][1]);
    }
  });
});

describe("components.tabBar", () => {
  const tabBar = components.tabBar;

  it("has all required tabBar properties", () => {
    expect(tabBar).toHaveProperty("height");
    expect(tabBar).toHaveProperty("horizontalInset");
    expect(tabBar).toHaveProperty("radius");
    expect(tabBar).toHaveProperty("iconFrame");
    expect(tabBar).toHaveProperty("itemPaddingVertical");
  });

  it("tabBar height equals spacing[18]", () => {
    expect(tabBar.height).toBe(spacing[18]);
    expect(tabBar.height).toBe(72);
  });

  it("tabBar horizontalInset equals spacing[5]", () => {
    expect(tabBar.horizontalInset).toBe(spacing[5]);
    expect(tabBar.horizontalInset).toBe(20);
  });

  it("tabBar radius equals spacing[8]", () => {
    expect(tabBar.radius).toBe(spacing[8]);
    expect(tabBar.radius).toBe(32);
  });

  it("tabBar iconFrame equals spacing[12]", () => {
    expect(tabBar.iconFrame).toBe(spacing[12]);
    expect(tabBar.iconFrame).toBe(48);
  });

  it("tabBar itemPaddingVertical equals spacing[2]", () => {
    expect(tabBar.itemPaddingVertical).toBe(spacing[2]);
    expect(tabBar.itemPaddingVertical).toBe(8);
  });

  it("tabBar height is greater than iconFrame", () => {
    expect(tabBar.height).toBeGreaterThan(tabBar.iconFrame);
  });

  it("tabBar radius is positive", () => {
    expect(tabBar.radius).toBeGreaterThan(0);
  });
});

describe("theme", () => {
  it("exports unified theme object with all sub-objects", () => {
    expect(theme).toHaveProperty("colors");
    expect(theme).toHaveProperty("spacing");
    expect(theme).toHaveProperty("components");
  });

  it("theme.colors is the same reference as the exported colors", () => {
    expect(theme.colors).toBe(colors);
  });

  it("theme.spacing is the same reference as the exported spacing", () => {
    expect(theme.spacing).toBe(spacing);
  });

  it("theme.components is the same reference as the exported components", () => {
    expect(theme.components).toBe(components);
  });
});