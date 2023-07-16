import React, { useState } from "react";
import { TouchableWithoutFeedback, Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Layout, Text, Button, Input, Icon } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm } from "react-hook-form";

import { colors, styles } from "../../style";
import { resetPassword, useSignIn } from "../../lib/amplify-auth";
import { storageKey } from "../../constants";
import { HeadingText, LoadingIndicator } from "../../lib/components";
import {
  requiredField,
  validateEmail,
  validatePassword,
} from "../../lib/forms";

export const Login = ({ navigation, updateUser }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [signInLoading, setSignInLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const toast = useToast();
  const { signIn } = useSignIn();

  const emailInputRef = React.useRef();
  const passInputRef = React.useRef();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const emailWatcher = watch("email");

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSignIn = async ({ email, password }) => {
    setSignInLoading(true);
    const {
      error,
      isSuccess: signInSuccess,
      isError: signInError,
    } = await signIn({ username: email, password });

    if (signInSuccess && !signInError) {
      navigation.reset({
        index: 0,
        routes: [{ name: "inside" }],
      });
    } else if (error === "UserNotConfirmedException") {
      await AsyncStorage.setItem(storageKey.PendingUser, email.toLowerCase());
      navigation.navigate("confirmEmail");
    } else {
      toast.show("Incorrect email / password.");
    }
    setSignInLoading(false);
  };

  const handleResetPassword = async () => {
    if (!emailWatcher) {
      toast.show("Enter your email to start password reset.");
      return;
    }
    setResetLoading(true);
    try {
      await resetPassword(emailWatcher);
      await AsyncStorage.setItem(
        storageKey.PendingUser,
        emailWatcher.toLowerCase()
      );
      setResetLoading(false);
      navigation.navigate("forgotPassword");
    } catch (error) {
      setResetLoading(false);
      toast.show("Problem resetting password.");
    }
  };

  const renderIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
        fill="#eee"
        style={{ width: 22, height: 22 }}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <HeadingText>log in</HeadingText>
      <Layout style={styles.forms}>
        <Controller
          control={control}
          name="email"
          rules={{
            validate: {
              requiredField,
              validateEmail,
            },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Input
              ref={emailInputRef}
              style={[
                styles.input,
                invalid && styles.selectInputDanger,
                {
                  color: "white",
                },
              ]}
              textStyle={{
                color: colors.light,
              }}
              size="large"
              keyboardType="email-address"
              returnKeyType="next"
              returnKeyLabel="Next"
              blurOnSubmit={false}
              onSubmitEditing={() => passInputRef.current.focus()}
              textContentType="emailAddress"
              value={value}
              label="email"
              onChangeText={onChange}
              maxLength={100}
            />
          )}
        />
        {formErrors.email && (
          <Text style={{ fontSize: 11, alignSelf: "flex-end" }} status="danger">
            {formErrors.email.message}
          </Text>
        )}

        <Controller
          control={control}
          name="password"
          rules={{
            validate: validatePassword,
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Input
              ref={passInputRef}
              style={[styles.input, invalid && styles.selectInputDanger]}
              textStyle={{
                color: colors.light,
              }}
              size="large"
              secureTextEntry={secureTextEntry}
              accessoryRight={renderIcon}
              returnKeyType="done"
              returnKeyLabel="Done"
              onSubmitEditing={() => handleSubmit(handleSignIn)}
              value={value}
              label="password"
              onChangeText={onChange}
              maxLength={50}
            />
          )}
        />
        {formErrors.password && (
          <Text style={{ fontSize: 11, alignSelf: "flex-end" }} status="danger">
            {formErrors.password.message}
          </Text>
        )}
      </Layout>

      <Button
        appearance="ghost"
        onPress={handleSubmit(handleSignIn)}
        disabled={signInLoading}
        accessoryLeft={
          signInLoading ? <LoadingIndicator loadingText="Logging in" /> : null
        }
      >
        {signInLoading ? "" : "LOG IN"}
      </Button>
      <Button
        appearance="ghost"
        onPress={handleResetPassword}
        disabled={resetLoading}
        accessoryLeft={
          resetLoading ? <LoadingIndicator loadingText="Resetting" /> : null
        }
      >
        {resetLoading ? "" : "RESET PASSWORD"}
      </Button>
      <Layout
        style={{
          alignItems: "center",
          backgroundColor: "transparent",
          marginBottom: 60,
        }}
      >
        <Pressable>
          <Button
            appearance="ghost"
            onPress={() => navigation.navigate("register")}
          >
            REGISTER
          </Button>
        </Pressable>
      </Layout>
    </Layout>
  );
};
