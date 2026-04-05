import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
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
    </SafeAreaView>
  );
}
