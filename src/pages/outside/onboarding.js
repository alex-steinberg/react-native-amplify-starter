import React from "react";
import { StatusBar, Pressable } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "../../constants";
import { styles } from "../../style";
import { ThemedText } from "../../lib/components";

const COLORS = { primary: "#241F1F", white: "#fff", red: "#DA291C" };

export const OnboardingScreen = ({ navigation }) => {
  const handleOnboardingDone = async () => {
    await AsyncStorage.setItem(storageKey.OnboardingDone, "true");
    navigation.navigate("outside");
  };

  return (
    <Layout style={[styles.container]}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ThemedText>Onboarding / coaching screens go here</ThemedText>
      <Pressable>
        <Button appearance="ghost" onPress={handleOnboardingDone}>
          Done
        </Button>
      </Pressable>
    </Layout>
  );
};
