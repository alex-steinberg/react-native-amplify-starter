import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Amplify } from "aws-amplify";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { default as theme } from "./src/custom-theme.json";
import { default as mapping } from "./src/mapping.json";
import { default as mappingIOS } from "./src/mappingIOS.json";
import { AppNav } from "./src/navigator/navigator";
import awsExports from "./src/aws-exports";
import { AppToastProvider } from "./src/providers/AppToastProvider";
import { storageKey } from "./src/constants";
import { useLoggedInUser } from "./src/lib/amplify-auth";

Amplify.configure(awsExports);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const { user, error: userError } = useLoggedInUser();
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [customFonts] = useFonts({
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
  });

  const [onboardingDone, setOnboardingDone] = useState(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (
      (user !== null || userError !== null) &&
      customFonts &&
      onboardingDone !== null
    ) {
      setAppIsReady(true);
      setUserLoggedIn(!!user && !userError);
    }
  }, [user, userError, customFonts, onboardingDone]);

  useEffect(() => {
    AsyncStorage.getItem(storageKey.OnboardingDone).then((value) => {
      if (value) {
        AsyncStorage.setItem(storageKey.OnboardingDone, "true");
        setOnboardingDone(true);
      } else {
        setOnboardingDone(false);
      }
    });
  }, []);

  if (!customFonts) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppToastProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.dark, ...theme }}
          customMapping={Platform.OS === "ios" ? mappingIOS : mapping}
        >
          <AppNav
            appIsReady={appIsReady}
            onboardingDone={onboardingDone}
            userLoggedIn={userLoggedIn}
            user={user}
            style={{ padding: 20 }}
          />
        </ApplicationProvider>
      </AppToastProvider>
    </QueryClientProvider>
  );
};
export default App;
