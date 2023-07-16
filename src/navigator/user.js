import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, homeNavOptions } from "../pages/inside/home";
import { Settings, settingsNavOptions } from "../pages/inside/settings";
import { Profile, profileNavOptions } from "../pages/inside/profile";

const UserStack = createNativeStackNavigator();

const UserStackNav = ({ navigation }) => (
  <UserStack.Navigator
    mode={"modal"}
    initialRouteName="home"
    screenOptions={{
      headerShown: true,
      headerTransparent: true,
      headerBackTitleVisible: false,
      title: "",
      headerTintColor: "#fff",
    }}
  >
    <UserStack.Screen name="home" component={Home} options={homeNavOptions} />

    <UserStack.Screen
      name="settings"
      component={Settings}
      options={settingsNavOptions}
    />

    <UserStack.Screen
      name="profile"
      component={Profile}
      options={profileNavOptions}
    />
  </UserStack.Navigator>
);

export { UserStackNav };
