# Recurrly

A subscription tracking app built with React Native and Expo. Keep track of all your recurring subscriptions in one place — see what you're spending, when payments are due, and stay on top of your finances.

## Features

- **Subscription tracking** — add and manage all your recurring subscriptions
- **Insights** — visualize spending patterns and monthly costs at a glance
- **Onboarding** — smooth first-run experience to get set up quickly
- **Auth** — sign in / sign up flow
- **Settings** — manage your account and preferences

## Tech Stack

- [Expo](https://expo.dev) + [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- [React Native](https://reactnative.dev)
- [NativeWind](https://www.nativewind.dev) (Tailwind CSS for React Native)
- [React Navigation](https://reactnavigation.org)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## Getting Started

**Install dependencies**

```bash
npm install
```

**Run the app**

```bash
npx expo start
```

Then open in your preferred environment:

| Platform | Command |
|----------|---------|
| iOS Simulator | Press `i` |
| Android Emulator | Press `a` |
| Physical device | Scan QR with [Expo Go](https://expo.dev/go) |

## Project Structure

```
app/
├── (auth)/          # Sign in & sign up screens
├── (tabs)/          # Main tab screens
│   ├── index.tsx        # Home / dashboard
│   ├── subscriptions.tsx
│   ├── subscriptions/[id].tsx
│   ├── insights.tsx
│   └── settings.tsx
├── onboarding.tsx   # First-run onboarding
└── _layout.tsx      # Root layout
assets/
├── fonts/           # Plus Jakarta Sans
├── icons/           # App & service icons
└── images/          # Brand assets
```

## Development

This project uses file-based routing via Expo Router. Add new screens by creating files inside the `app/` directory.

Styles are written with NativeWind — use Tailwind utility classes directly on React Native components via the `className` prop.
