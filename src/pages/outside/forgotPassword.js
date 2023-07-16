import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Layout, Text, Button, Input, Icon } from "@ui-kitten/components";
import { styles, colors } from "../../style";
import { confirmNewPassword } from "../../lib/amplify-auth";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "../../constants";
import { Controller, useForm } from "react-hook-form";
import {
  isNumber,
  requiredField,
  validateEmail,
  validatePassword,
} from "../../lib/forms";
import { HeadingText, LoadingIndicator } from "../../lib/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      code: "",
    },
  });

  const watchedPassword = watch("password");

  useEffect(() => {
    async function getUser() {
      const user = await AsyncStorage.getItem(storageKey.PendingUser);
      setValue("email", user);
    }
    getUser();
  }, []);

  const handleConfirmNewPassword = async (data) => {
    setLoading(true);
    try {
      await confirmNewPassword(data);
      navigation.navigate("login");
      toast.show("Password reset successful! Log in with your new password.");
      setLoading(false);
    } catch (error) {
      toast.show("Problem confirming new password.");
      setLoading(false);
    }
  };
  const AlertIcon = () => (
    <Icon
      name="alert-circle-outline"
      fill={colors.brand}
      style={{ width: 22, height: 22 }}
    />
  );

  const renderCaption = () => {
    return (
      <Layout style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text category="c1" style={styles.captionText}>
          Passwords should have - 1 Uppercase Character, 1 Special Character, 1
          Number and longer than 8 characters
        </Text>
      </Layout>
    );
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
        fill="#7D7C7E"
        style={{ width: 22, height: 22 }}
      />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntryConfirm = () => {
    setSecureTextEntryConfirm(!secureTextEntryConfirm);
  };

  const renderIconConfirm = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntryConfirm}>
      <Icon
        name={secureTextEntryConfirm ? "eye-off-outline" : "eye-outline"}
        fill="#7D7C7E"
        style={{ width: 22, height: 22 }}
      />
    </TouchableWithoutFeedback>
  );

  const emailInputRef = React.useRef();
  const verifyInputRef = React.useRef();
  const passInputRef = React.useRef();
  const confirmPassInputRef = React.useRef();

  return (
    <Layout style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.layout}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Layout style={styles.registerHeader}>
          <HeadingText>change your password</HeadingText>
        </Layout>
        <Layout style={styles.forms}>
          <Controller
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <Input
                ref={emailInputRef}
                style={[styles.input, invalid && styles.selectInputDanger]}
                textStyle={{
                  color: colors.light,
                }}
                label="email address"
                returnKeyType="next"
                returnKeyLabel="Next"
                blurOnSubmit={false}
                onSubmitEditing={() => verifyInputRef.current.focus()}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="email"
            rules={{ validate: { requiredField, validateEmail } }}
          />
          {formErrors.email && (
            <Text status="danger">{formErrors.email.message}</Text>
          )}
          <Controller
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <Input
                ref={verifyInputRef}
                style={[styles.input, invalid && styles.selectInputDanger]}
                textStyle={{
                  color: colors.light,
                }}
                label="verification dode"
                returnKeyType="next"
                returnKeyLabel="Next"
                blurOnSubmit={false}
                onSubmitEditing={() => passInputRef.current.focus()}
                value={value}
                caption="enter the confirmation code sent to email address."
                onChangeText={onChange}
              />
            )}
            name="code"
            rules={{ validate: { requiredField, isNumber } }}
          />
          {formErrors.code && (
            <Text status="danger">{formErrors.code.message}</Text>
          )}

          <Controller
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <Input
                ref={passInputRef}
                style={[styles.input, invalid && styles.selectInputDanger]}
                textStyle={{
                  color: colors.light,
                }}
                accessoryRight={renderIcon}
                caption={renderCaption}
                returnKeyType="next"
                returnKeyLabel="Next"
                blurOnSubmit={false}
                onSubmitEditing={() => confirmPassInputRef.current.focus()}
                value={value}
                label="new password"
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
              />
            )}
            name="password"
            rules={{ validate: { requiredField, validatePassword } }}
            secureTextEntry={secureTextEntry}
          />
          {formErrors.password && (
            <Text status="danger">{formErrors.password.message}</Text>
          )}

          <Controller
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <Input
                ref={confirmPassInputRef}
                style={[styles.input, invalid && styles.selectInputDanger]}
                accessoryRight={renderIconConfirm}
                returnKeyType="done"
                returnKeyLabel="Done"
                value={value}
                label="confirm password"
                secureTextEntry={secureTextEntryConfirm}
                onChangeText={onChange}
              />
            )}
            name="confirmPassword"
            rules={{
              validate: {
                match: (value) =>
                  value === watchedPassword || "The passwords do not match",
              },
            }}
            secureTextEntry={secureTextEntry}
          />
          {formErrors.confirmPassword && (
            <Text status="danger">{formErrors.confirmPassword.message}</Text>
          )}
        </Layout>
        <Button
          appearance="ghost"
          onPress={handleSubmit(handleConfirmNewPassword)}
          accessoryLeft={
            loading ? <LoadingIndicator loadingText="Confirming" /> : null
          }
        >
          {loading ? "" : "CONFIRM NEW PASSWORD"}
        </Button>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
