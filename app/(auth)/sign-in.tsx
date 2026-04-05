import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
      <Link href="/(auth)/sign-up" className="mt-4 text-lg text-primary">
        Don't have an account? Sign Up
      </Link>
    </View>
  );
};

export default SignIn;
