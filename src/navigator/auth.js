import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Landing } from "../pages/outside/landing";
import { Login } from "../pages/outside/login";
import { Register } from "../pages/outside/register";
import { ForgotPassword } from "../pages/outside/forgotPassword";
import { ConfirmEmail } from "../pages/outside/confirmEmail";

const AuthStack = createNativeStackNavigator();

const AuthStackNav = ({ updateUser }) => (
  <AuthStack.Navigator
    mode={"modal"}
    initialRouteName="welcome"
    screenOptions={{
      headerShown: true,
      headerTransparent: true,
      headerBackTitleVisible: false,
      title: "",
      headerTintColor: "#fff",
    }}
  >
    <AuthStack.Screen name="welcome" component={Landing} />
    <AuthStack.Screen name="login" component={Login} updateUser={updateUser} />
    <AuthStack.Screen name="register" component={Register} />
    <AuthStack.Screen name="forgotPassword" component={ForgotPassword} />
    <AuthStack.Screen name="confirmEmail" component={ConfirmEmail} />
  </AuthStack.Navigator>
);

export { AuthStackNav };
