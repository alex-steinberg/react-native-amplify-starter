import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Pressable,
} from "react-native";
import {
  Layout,
  Text,
  Button,
  Input,
  Divider,
  Icon,
  Toggle,
} from "@ui-kitten/components";
import { useToast } from "react-native-toast-notifications";
import { CountryPicker } from "react-native-country-codes-picker";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors, styles } from "../../style";
import { AppLoader } from "../../loader";
import { useRegister } from "../../lib/amplify-auth";
import { formatTelephone } from "../../lib/helpers";
import { storageKey } from "../../constants";
import {
  isNumber,
  requiredField,
  validateEmail,
  validatePassword,
} from "../../lib/forms";
import {
  HeadingText,
  LoadingIndicator,
  ThemedText,
} from "../../lib/components";

const defaultCountryCode = "+00";
export const Register = ({ navigation }) => {
  const [registering, setRegistering] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [countryFlag, setCountryFlag] = useState("");

  const nameInputRef = React.useRef();
  const surnameInputRef = React.useRef();
  const companyInputRef = React.useRef();
  const emailInputRef = React.useRef();
  const numberInputRef = React.useRef();
  const passInputRef = React.useRef();
  const confirmPassInputRef = React.useRef();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
      phone: "",
      terms: false,
    },
  });

  const watchedPassword = watch("password");

  const { register } = useRegister();

  const handleRegister = async ({
    email,
    password,
    firstName,
    lastName,
    company,
    phone,
  }) => {
    if (countryCode === defaultCountryCode) {
      toast.show("Choose a country code");
      return;
    }
    setRegistering(true);
    const registerPayload = {
      username: email.toLowerCase(),
      password,
      attributes: {
        email: email.toLowerCase(),
        family_name: lastName,
        given_name: firstName,
        profile: "1",
        phone_number: formatTelephone(countryCode, phone), // E.164 number convention
      },
    };
    if (company) {
      registerPayload.attributes["custom:company"] = company;
    }
    const { signUpResult, error } = await register(registerPayload);
    if (signUpResult) {
      await AsyncStorage.setItem(storageKey.PendingUser, email.toLowerCase());
      navigation.navigate("confirmEmail");
    } else {
      toast.show(`Problem registering ${error}`);
    }
    setRegistering(false);
  };

  const RenderCountry = () => (
    <Pressable onPress={() => setShow(true)}>
      <ThemedText>
        {countryFlag} {countryCode}
      </ThemedText>
    </Pressable>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const RenderIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
        fill={colors.light}
        style={{ width: 22, height: 22 }}
      />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntryConfirm = () => {
    setSecureTextEntryConfirm(!secureTextEntryConfirm);
  };

  const RenderIconConfirm = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntryConfirm}>
      <Icon
        name={secureTextEntryConfirm ? "eye-off-outline" : "eye-outline"}
        fill={colors.light}
        style={{ width: 22, height: 22 }}
      />
    </TouchableWithoutFeedback>
  );

  const AlertIcon = () => (
    <Icon
      name="alert-circle-outline"
      fill={colors.brand}
      style={{ width: 22, height: 22 }}
    />
  );

  const RenderCaption = () => {
    return (
      <Layout style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Passwords should have at least 1 uppercase character, 1 special
          character, 1 number and be 8 characters or longer
        </Text>
      </Layout>
    );
  };

  return (
    <Layout
      style={[
        styles.container,
        {
          flexDirection: "column",
          justifyContent: "flex-start",
        },
      ]}
    >
      {loading === true && <AppLoader />}
      <KeyboardAwareScrollView
        style={styles.layout}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Layout style={styles.scrollViewNudge}>
          <Layout style={styles.registerHeader}>
            <HeadingText>create your account</HeadingText>
          </Layout>
          <Layout style={styles.forms}>
            <Controller
              control={control}
              name="firstName"
              rules={{ validate: requiredField }}
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <Input
                  ref={nameInputRef}
                  style={[styles.input, invalid && styles.selectInputDanger]}
                  textStyle={{
                    color: colors.light,
                  }}
                  value={value}
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => surnameInputRef.current.focus()}
                  label="first name"
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.firstName && (
              <Text
                style={{ fontSize: 11, alignSelf: "flex-end" }}
                status="danger"
              >
                {formErrors.firstName.message}
              </Text>
            )}
            <Controller
              control={control}
              name="lastName"
              rules={{ validate: requiredField }}
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <Input
                  ref={surnameInputRef}
                  style={[styles.input, invalid && styles.selectInputDanger]}
                  textStyle={{
                    color: colors.light,
                  }}
                  value={value}
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => companyInputRef.current.focus()}
                  label="last name"
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.lastName && (
              <Text
                style={{ fontSize: 11, alignSelf: "flex-end" }}
                status="danger"
              >
                {formErrors.lastName.message}
              </Text>
            )}
            <Controller
              control={control}
              name="company"
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <Input
                  ref={companyInputRef}
                  style={[styles.input, invalid && styles.selectInputDanger]}
                  textStyle={{
                    color: colors.light,
                  }}
                  value={value}
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => emailInputRef.current.focus()}
                  label="company"
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.company && (
              <Text
                style={{ fontSize: 11, alignSelf: "flex-end" }}
                status="danger"
              >
                {formErrors.company.message}
              </Text>
            )}
            <Controller
              control={control}
              name="email"
              rules={{ validate: { requiredField, validateEmail } }}
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
                  value={value}
                  keyboardType="email-address"
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => numberInputRef.current.focus()}
                  label="email"
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.email && (
              <Text
                style={{ fontSize: 11, alignSelf: "flex-end" }}
                status="danger"
              >
                {formErrors.email.message}
              </Text>
            )}
            <Controller
              control={control}
              name="phone"
              rules={{ validate: { requiredField, isNumber } }}
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <Input
                  ref={numberInputRef}
                  style={[styles.input, invalid && styles.selectInputDanger]}
                  textStyle={{
                    color: colors.light,
                  }}
                  accessoryLeft={RenderCountry}
                  value={value}
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => passInputRef.current.focus()}
                  keyboardType="numeric"
                  label="phone number"
                  onChangeText={onChange}
                  maxLength={50}
                />
              )}
            />
            {formErrors.phone && (
              <Text
                style={{ fontSize: 11, alignSelf: "flex-end" }}
                status="danger"
              >
                {formErrors.phone.message}
              </Text>
            )}
            <CountryPicker
              show={show}
              style={{
                // Styles for whole modal [View]
                modal: {
                  height: 400,
                },
                // Styles for input [TextInput]
                textInput: {
                  height: 40,
                  borderRadius: 0,
                },
                // Styles for country button [TouchableOpacity]
                countryButtonStyles: {
                  height: 40,
                },
              }}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                setCountryFlag(item.flag);
                setShow(false);
              }}
            />
            <Divider />
            <Controller
              control={control}
              name="password"
              rules={{ validate: { requiredField, validatePassword } }}
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
                  value={value}
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => confirmPassInputRef.current.focus()}
                  label="password"
                  caption={!formErrors.password && RenderCaption}
                  accessoryRight={RenderIcon}
                  maxLength={50}
                  secureTextEntry={secureTextEntry}
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.password && (
              <Text
                style={{ fontSize: 11, alignSelf: "flex-end" }}
                status="danger"
              >
                {formErrors.password.message}
              </Text>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                validate: {
                  match: (value) =>
                    value === watchedPassword || "The passwords do not match",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { invalid },
              }) => (
                <Input
                  ref={confirmPassInputRef}
                  style={[styles.input, invalid && styles.selectInputDanger]}
                  textStyle={{
                    color: colors.light,
                  }}
                  value={value}
                  returnKeyType="done"
                  returnKeyLabel="done"
                  label="confirm password"
                  accessoryRight={RenderIconConfirm}
                  maxLength={50}
                  secureTextEntry={secureTextEntryConfirm}
                  onChangeText={onChange}
                />
              )}
            />
            {formErrors.confirmPassword && (
              <Text
                style={{ fontSize: 11, alignSelf: "flex-end" }}
                status="danger"
              >
                {formErrors.confirmPassword.message}
              </Text>
            )}

            <Layout style={styles.toggleRadio}>
              <Controller
                control={control}
                rules={{
                  validate: {
                    terms: (value) =>
                      value === true || "Must accept the terms and conditions",
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <Toggle
                    checked={value}
                    onChange={onChange}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <ThemedText style={{ color: colors.brand, fontSize: 12 }}>
                      I accept the license and terms
                    </ThemedText>
                  </Toggle>
                )}
                name="terms"
              />
            </Layout>
            {formErrors.terms && (
              <Text style={{ fontSize: 11 }} status="danger">
                {formErrors.terms.message}
              </Text>
            )}
          </Layout>
          <Layout
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
              marginTop: -30,
            }}
          >
            <Text style={styles.linkText}>Already have an account?</Text>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate("login")}
            >
              <Text style={[styles.linkText, styles.bold]}>Log in</Text>
            </TouchableNativeFeedback>
          </Layout>
          <Button
            appearance="ghost"
            onPress={handleSubmit(handleRegister)}
            disabled={registering}
            accessoryLeft={
              registering ? (
                <LoadingIndicator loadingText="Registering" />
              ) : null
            }
          >
            {registering ? "" : "REGISTER"}
          </Button>
        </Layout>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
