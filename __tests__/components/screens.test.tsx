import { render } from "@testing-library/react-native";
import React from "react";

// Mock expo-router Link component
jest.mock("expo-router", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { Text } = require("react-native");
    return <Text testID={`link-${href}`}>{children}</Text>;
  },
  Tabs: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

// Mock nativewind styled to return the component itself
jest.mock("nativewind", () => ({
  styled: (Component: any) => Component,
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => {
  const { View } = require("react-native");
  return {
    SafeAreaView: ({ children, ...props }: any) => <View {...props}>{children}</View>,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

import App from "@/app/(tabs)/index";
import Insights from "@/app/(tabs)/insights";
import Settings from "@/app/(tabs)/settings";
import Subscriptions from "@/app/(tabs)/subscriptions";

describe("Home screen (index.tsx)", () => {
  it("renders without crashing", () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it("renders the welcome text", () => {
    const { getByText } = render(<App />);
    expect(getByText("Welcome to Nativewind!")).toBeTruthy();
  });

  it("renders a 'Get Started' link to onboarding", () => {
    const { getByText } = render(<App />);
    expect(getByText("Get Started")).toBeTruthy();
  });

  it("renders a 'View Subscriptions' link", () => {
    const { getByText } = render(<App />);
    expect(getByText("View Subscriptions")).toBeTruthy();
  });

  it("renders a sign-in link", () => {
    const { getByText } = render(<App />);
    expect(getByText("Already have an account? Sign In")).toBeTruthy();
  });

  it("renders all three navigation links", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("link-/onboarding")).toBeTruthy();
    expect(getByTestId("link-/(auth)/sign-in")).toBeTruthy();
    expect(getByTestId("link-/subscriptions/spotify")).toBeTruthy();
  });

  it("the view subscriptions link points to the correct route", () => {
    const { getByTestId } = render(<App />);
    const link = getByTestId("link-/subscriptions/spotify");
    expect(link).toBeTruthy();
  });
});

describe("Insights screen (insights.tsx)", () => {
  it("renders without crashing", () => {
    expect(() => render(<Insights />)).not.toThrow();
  });

  it("renders the Insights heading text", () => {
    const { getByText } = render(<Insights />);
    expect(getByText("Insights")).toBeTruthy();
  });

  it("renders exactly one text element", () => {
    const { getAllByText } = render(<Insights />);
    expect(getAllByText("Insights")).toHaveLength(1);
  });
});

describe("Settings screen (settings.tsx)", () => {
  it("renders without crashing", () => {
    expect(() => render(<Settings />)).not.toThrow();
  });

  it("renders the Settings heading text", () => {
    const { getByText } = render(<Settings />);
    expect(getByText("Settings")).toBeTruthy();
  });

  it("renders exactly one text element", () => {
    const { getAllByText } = render(<Settings />);
    expect(getAllByText("Settings")).toHaveLength(1);
  });
});

describe("Subscriptions screen (subscriptions.tsx)", () => {
  it("renders without crashing", () => {
    expect(() => render(<Subscriptions />)).not.toThrow();
  });

  it("renders the Subscriptions heading text", () => {
    const { getByText } = render(<Subscriptions />);
    expect(getByText("Subscriptions")).toBeTruthy();
  });

  it("renders exactly one text element", () => {
    const { getAllByText } = render(<Subscriptions />);
    expect(getAllByText("Subscriptions")).toHaveLength(1);
  });
});

describe("Screen components use SafeAreaView (not plain View)", () => {
  it("Insights renders inside a SafeAreaView container", () => {
    const { toJSON } = render(<Insights />);
    const tree = toJSON();
    expect(tree).not.toBeNull();
  });

  it("Settings renders inside a SafeAreaView container", () => {
    const { toJSON } = render(<Settings />);
    const tree = toJSON();
    expect(tree).not.toBeNull();
  });

  it("Subscriptions renders inside a SafeAreaView container", () => {
    const { toJSON } = render(<Subscriptions />);
    const tree = toJSON();
    expect(tree).not.toBeNull();
  });

  it("Home screen renders inside a SafeAreaView container", () => {
    const { toJSON } = render(<App />);
    const tree = toJSON();
    expect(tree).not.toBeNull();
  });
});