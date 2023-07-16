import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import { useToast } from "react-native-toast-notifications";
import { Layout, Text, Button, Input, Icon } from "@ui-kitten/components";
import { useMutation } from "@tanstack/react-query";
import { colors, styles } from "../../style";
import { AppLoader } from "../../loader";
import { Controller, useForm } from "react-hook-form";
import {
  useLoggedInUser,
  updateUserProfile,
  deleteAccount,
} from "../../lib/amplify-auth";
import {
  requiredField,
  validateEmail,
  isNumber,
  startsWithPlus,
} from "../../lib/forms";
import { HeadingText } from "../../lib/components";

const profileNavOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      style={styles.backArrow}
      onPress={() => navigation.navigate("home")}
    >
      <Icon name="home-outline" fill="#fff" style={{ width: 22, height: 22 }} />
    </TouchableOpacity>
  ),
});
const Profile = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [confirmDeleteAccountVisible, setConfirmDeleteAccountVisible] =
    useState(false);
  const toast = useToast();
  const {
    user: {
      attributes: {
        email,
        given_name,
        family_name,
        phone_number,
        ["custom:company"]: company,
      },
    },
    error: userError,
  } = useLoggedInUser();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    defaultValues: {
      email: email,
      firstName: given_name,
      lastName: family_name,
      phoneNumber: phone_number,
      company: company,
      country: "",
    },
  });

  useEffect(() => {
    if (email && given_name && family_name && phone_number) {
      reset({
        email,
        firstName: given_name,
        lastName: family_name,
        phoneNumber: phone_number,
        company,
      });
    }
  }, [email, given_name, family_name, phone_number, company]);

  const { mutate } = useMutation({
    mutationFn: ({
      email,
      firstName: given_name,
      lastName: family_name,
      phoneNumber: phone_number,
      company,
    }) => {
      const payload = {
        email,
        given_name,
        family_name,
        phone_number,
      };
      if (company) {
        payload["custom:company"] = company;
      }
      return updateUserProfile(payload);
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.show("Profile updated!");
      navigation.pop();
    },
    onError: (error) => {
      setLoading(false);
      toast.show("Problem updating profile");
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    mutate(data);
  };

  const deleteUser = async () => {
    await deleteAccount();
    toast.show("Account deleted");
    navigation.navigate("outside");
    setConfirmDeleteAccountVisible(false);
    setLoading(true);
  };

  return (
    <Layout style={styles.container}>
      <Dialog.Container visible={confirmDeleteAccountVisible}>
        <Dialog.Title>Delete user profile</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete your account? This action can't be
          undone. All your data will be permanently deleted.
        </Dialog.Description>
        <Dialog.Button
          label="Cancel"
          onPress={() => setConfirmDeleteAccountVisible(false)}
        />
        <Dialog.Button label="Delete account" onPress={deleteUser} />
      </Dialog.Container>
      {loading === true && <AppLoader />}
      <HeadingText>update your profile</HeadingText>
      <Layout style={styles.forms}>
        <Controller
          control={control}
          name="email"
          rules={{ validate: { requiredField, validateEmail } }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Input
              style={[styles.input, invalid ? styles.selectInputDanger : ""]}
              textStyle={{
                color: colors.light,
              }}
              value={value}
              label="email address"
              onChangeText={onChange}
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
          name="firstName"
          rules={{ validate: requiredField }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Input
              style={[styles.input, invalid ? styles.selectInputDanger : ""]}
              textStyle={{
                color: colors.light,
              }}
              value={value}
              label="first name"
              onChangeText={onChange}
            />
          )}
        />
        {formErrors.firstName && (
          <Text style={{ fontSize: 11, alignSelf: "flex-end" }} status="danger">
            {formErrors.firstName.message}
          </Text>
        )}

        <Controller
          control={control}
          name="lastName"
          rules={{ validate: requiredField }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Input
              style={[styles.input, invalid ? styles.selectInputDanger : ""]}
              textStyle={{
                color: colors.light,
              }}
              value={value}
              label="last name"
              onChangeText={onChange}
            />
          )}
        />
        {formErrors.lastName && (
          <Text style={{ fontSize: 11, alignSelf: "flex-end" }} status="danger">
            {formErrors.lastName.message}
          </Text>
        )}

        <Controller
          control={control}
          name="company"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Input
              style={[styles.input, invalid ? styles.selectInputDanger : ""]}
              textStyle={{
                color: colors.light,
              }}
              value={value}
              label="company"
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          rules={{ validate: { requiredField, isNumber, startsWithPlus } }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Input
              style={[styles.input, invalid ? styles.selectInputDanger : ""]}
              textStyle={{
                color: colors.light,
              }}
              value={value}
              keyboardType="numeric"
              label="phone number"
              onChangeText={onChange}
              maxLength={50}
            />
          )}
        />
        {formErrors.phoneNumber && (
          <Text style={{ fontSize: 11, alignSelf: "flex-end" }} status="danger">
            {formErrors.phoneNumber.message}
          </Text>
        )}
      </Layout>
      <Button appearance="ghost" onPress={handleSubmit(onSubmit)}>
        UPDATE
      </Button>
      <Button
        appearance="ghost"
        status="danger"
        size="small"
        style={{ margin: 15 }}
        onPress={() => setConfirmDeleteAccountVisible(true)}
      >
        Delete my account
      </Button>
    </Layout>
  );
};

export { Profile, profileNavOptions };
