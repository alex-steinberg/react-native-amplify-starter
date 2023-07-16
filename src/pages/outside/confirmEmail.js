import React, { useState } from "react";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { colors, styles } from "../../style";
import { AppLoader } from "../../loader";
import {
  confirmRegistration,
  resendCode,
  useLoggedInUser,
} from "../../lib/amplify-auth";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeadingText } from "../../lib/components";
import { Controller, useForm } from "react-hook-form";
import { isNumber, requiredField } from "../../lib/forms";

const verificationCodeLength = (v) =>
  v.length === 6 || "Enter a six-digit code";

export const ConfirmEmail = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      verificationCode: "",
    },
  });

  const { pendingUser } = useLoggedInUser();

  const handleResendCode = async () => {
    setLoading(true);
    try {
      await resendCode(pendingUser);
      toast.show("Code sent! Check your email.");
      setLoading(false);
    } catch (error) {
      toast.show("Problem sending code");
      setLoading(false);
    }
  };

  const handleConfirm = async ({ verificationCode }) => {
    console.log({ verificationCode });
    setLoading(true);
    try {
      const confirmResult = await confirmRegistration(
        pendingUser,
        verificationCode
      );
      if (confirmResult) {
        await AsyncStorage.removeItem(storageKey.PendingUser);
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "inside" }],
        });
      }
    } catch (error) {
      toast.show("Problem with email confirmation");
      setLoading(false);
    }
  };

  return (
    <Layout style={styles.container}>
      {loading === true && <AppLoader />}
      <KeyboardAwareScrollView
        style={styles.layout}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Layout style={styles.registerHeader}>
          <HeadingText>confirm your email</HeadingText>
        </Layout>
        <Layout style={styles.forms}>
          <Controller
            control={control}
            name="verificationCode"
            rules={{
              validate: {
                requiredField,
                verificationCodeLength,
                isNumber,
              },
            }}
            render={({
              field: { onChange, value },
              fieldState: { invalid },
            }) => (
              <Input
                style={[styles.input, invalid && styles.selectInputDanger]}
                textStyle={{
                  color: colors.light,
                }}
                textContentType="oneTimeCode"
                value={value}
                maxLength={6}
                label="verification code"
                caption="Enter the confirmation code sent to your email address."
                onChangeText={onChange}
              />
            )}
          />
          {formErrors.verificationCode && (
            <Text
              style={{ fontSize: 11, alignSelf: "flex-end" }}
              status="danger"
            >
              {formErrors.verificationCode.message}
            </Text>
          )}
        </Layout>
        <Button appearance="ghost" onPress={handleSubmit(handleConfirm)}>
          CONFIRM
        </Button>
        <Button appearance="ghost" onPress={handleResendCode}>
          RESEND CODE
        </Button>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
