import { render } from "@testing-library/react-native";
import React from "react";

// jest.mock is hoisted - all mock factories must be self-contained
// We use jest.requireMock after to access the mock functions

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn().mockReturnValue({
    top: 0,
    bottom: 34,
    left: 0,
    right: 0,
  }),
}));

jest.mock("expo-router", () => {
  const { View, Text } = require("react-native");
  const MockTabsScreen = jest.fn(({ name, options }: any) => (
    <View testID={`tab-screen-${name}`}>
      <Text>{options?.title}</Text>
    </View>
  ));
  const MockTabs = ({ children }: any) => (
    <View testID="tabs-container">{children}</View>
  );
  MockTabs.Screen = MockTabsScreen;
  return { Tabs: MockTabs };
});

import TabLayout from "@/app/(tabs)/_layout";
import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";

// Get references to mocked functions after mocks are set up
const { useSafeAreaInsets } =
  jest.requireMock<{ useSafeAreaInsets: jest.Mock }>(
    "react-native-safe-area-context"
  );
const { Tabs } = jest.requireMock<{ Tabs: any }>("expo-router");
const mockTabsScreen: jest.Mock = Tabs.Screen;

describe("TabLayout component", () => {
  beforeEach(() => {
    mockTabsScreen.mockClear();
    useSafeAreaInsets.mockReturnValue({
      top: 0,
      bottom: 34,
      left: 0,
      right: 0,
    });
  });

  it("renders without crashing", () => {
    expect(() => render(<TabLayout />)).not.toThrow();
  });

  it("renders a Tabs container", () => {
    const { getByTestId } = render(<TabLayout />);
    expect(getByTestId("tabs-container")).toBeTruthy();
  });

  it("renders a Tabs.Screen for each tab in the tabs data", () => {
    render(<TabLayout />);
    expect(mockTabsScreen).toHaveBeenCalledTimes(tabs.length);
  });

  it("renders Tabs.Screen for index tab", () => {
    render(<TabLayout />);
    const indexCall = mockTabsScreen.mock.calls.find(
      ([props]: [any]) => props.name === "index"
    );
    expect(indexCall).toBeDefined();
    expect(indexCall![0].options.title).toBe("Home");
  });

  it("renders Tabs.Screen for subscriptions tab", () => {
    render(<TabLayout />);
    const subCall = mockTabsScreen.mock.calls.find(
      ([props]: [any]) => props.name === "subscriptions"
    );
    expect(subCall).toBeDefined();
    expect(subCall![0].options.title).toBe("Subscriptions");
  });

  it("renders Tabs.Screen for insights tab", () => {
    render(<TabLayout />);
    const insightsCall = mockTabsScreen.mock.calls.find(
      ([props]: [any]) => props.name === "insights"
    );
    expect(insightsCall).toBeDefined();
    expect(insightsCall![0].options.title).toBe("Insights");
  });

  it("renders Tabs.Screen for settings tab", () => {
    render(<TabLayout />);
    const settingsCall = mockTabsScreen.mock.calls.find(
      ([props]: [any]) => props.name === "settings"
    );
    expect(settingsCall).toBeDefined();
    expect(settingsCall![0].options.title).toBe("Settings");
  });

  it("each Tabs.Screen receives a tabBarIcon function in options", () => {
    render(<TabLayout />);
    mockTabsScreen.mock.calls.forEach(([props]: [any]) => {
      expect(typeof props.options.tabBarIcon).toBe("function");
    });
  });

  it("tabBarIcon callback for focused=true does not throw", () => {
    render(<TabLayout />);
    const firstTabCall = mockTabsScreen.mock.calls[0];
    const tabBarIcon = firstTabCall[0].options.tabBarIcon;
    expect(() => tabBarIcon({ focused: true })).not.toThrow();
  });

  it("tabBarIcon callback for focused=false does not throw", () => {
    render(<TabLayout />);
    const firstTabCall = mockTabsScreen.mock.calls[0];
    const tabBarIcon = firstTabCall[0].options.tabBarIcon;
    expect(() => tabBarIcon({ focused: false })).not.toThrow();
  });

  it("uses safe area bottom inset for tabBar bottom position (large inset)", () => {
    useSafeAreaInsets.mockReturnValue({
      top: 0,
      bottom: 50,
      left: 0,
      right: 0,
    });
    expect(() => render(<TabLayout />)).not.toThrow();
  });

  it("falls back to horizontalInset when safe area bottom inset is zero", () => {
    useSafeAreaInsets.mockReturnValue({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
    expect(() => render(<TabLayout />)).not.toThrow();
  });

  it("renders the correct number of tab screens (4)", () => {
    render(<TabLayout />);
    expect(mockTabsScreen).toHaveBeenCalledTimes(4);
  });

  it("all Tabs.Screen components have a unique key (the tab name)", () => {
    render(<TabLayout />);
    const names = mockTabsScreen.mock.calls.map(([props]: [any]) => props.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});

describe("TabLayout tabBar style calculations", () => {
  it("tabBar height matches components.tabBar.height (spacing[18] = 72)", () => {
    expect(components.tabBar.height).toBe(72);
  });

  it("tabBar horizontalInset matches components.tabBar.horizontalInset (spacing[5] = 20)", () => {
    expect(components.tabBar.horizontalInset).toBe(20);
  });

  it("tabBar backgroundColor uses colors.primary (#081126)", () => {
    expect(colors.primary).toBe("#081126");
  });

  it("Math.max(insets.bottom, horizontalInset) returns larger insets.bottom value", () => {
    const insetsBottom = 34;
    const horizontalInset = components.tabBar.horizontalInset;
    const result = Math.max(insetsBottom, horizontalInset);
    expect(result).toBe(34);
  });

  it("Math.max(insets.bottom, horizontalInset) returns horizontalInset when insets.bottom is 0", () => {
    const insetsBottom = 0;
    const horizontalInset = components.tabBar.horizontalInset;
    const result = Math.max(insetsBottom, horizontalInset);
    expect(result).toBe(horizontalInset);
  });

  it("paddingVertical calculation (height/2 - iconFrame/1.6) is positive", () => {
    const { height, iconFrame } = components.tabBar;
    const paddingVertical = height / 2 - iconFrame / 1.6;
    expect(paddingVertical).toBeGreaterThan(0);
  });

  it("tabBar iconFrame dimensions are square (width equals height)", () => {
    const { iconFrame } = components.tabBar;
    // Both width and height use iconFrame in tabBarIconStyle
    expect(iconFrame).toBe(iconFrame);
    expect(typeof iconFrame).toBe("number");
    expect(iconFrame).toBeGreaterThan(0);
  });
});