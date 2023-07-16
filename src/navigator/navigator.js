import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingScreen } from "../pages/outside/onboarding";
import { UserStackNav } from "./user";
import { AuthStackNav } from "./auth";

const RootNavigator = createNativeStackNavigator();

export const AppNav = ({ appIsReady, onboardingDone, userLoggedIn }) => {
  const navigationRef = React.useRef(null);

  React.useEffect(() => {
    navigationRef.current.reset({
      index: 0,
      routes: [{ name: getInitialRoute() }],
    });
  }, [appIsReady, onboardingDone, userLoggedIn]);

  const getInitialRoute = () => {
    if (appIsReady && !onboardingDone) return "onboarding";
    if (userLoggedIn) return "inside";
    return "outside";
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={getInitialRoute()} // Function to decide initial route
        >
          <RootNavigator.Screen name="inside" component={UserStackNav} />
          <RootNavigator.Screen
            name="onboarding"
            component={OnboardingScreen}
          />
          <RootNavigator.Screen name="outside" component={AuthStackNav} />
        </RootNavigator.Navigator>
      </NavigationContainer>
    </>
  );
};
