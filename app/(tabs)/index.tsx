import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding" className="mt-4 text-lg text-primary">
        Get Started
      </Link>
      <Link href="/(auth)/sign-in" className="mt-4 text-lg text-primary">
        Already have an account? Sign In
      </Link>
      <Link href="/subscriptions/spotify" className="mt-4 text-lg text-primary">
        View Subscriptions
      </Link>
    </View>
  );
}
