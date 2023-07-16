import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "../constants";
import { authenticateRequests, axiosInstance } from "./server";

const useRegister = () => {
  const register = async (payload) => {
    try {
      const signUp = await Auth.signUp({
        ...payload,
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      return { signUpResult: signUp };
    } catch (error) {
      return { error };
    }
  };

  return { register };
};

const useSignIn = () => {
  const signIn = async (username, password) => {
    let isSuccess = false;
    let isError = false;
    try {
      const user = await Auth.signIn(username, password);
      isSuccess = true;
      return { user, isSuccess, isError };
    } catch (error) {
      isError = true;
      return { isError, isSuccess, error: error.code };
    }
  };
  return { signIn };
};

const signOut = async () => {
  return await Auth.signOut();
};

const useLoggedInUser = () => {
  const [user, setUser] = useState({ attributes: { email: "" } });
  const [pendingUser, setPendingUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const userData = await Auth.currentAuthenticatedUser();
        setUser(userData);
        authenticateRequests(
          axiosInstance,
          userData.signInUserSession.idToken.jwtToken
        );
      } catch (error) {
        setError(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    async function getPendingUser() {
      const pendingUser = await AsyncStorage.getItem(storageKey.PendingUser);
      setPendingUser(pendingUser);
    }
    getPendingUser();
  }, []);

  return { user, pendingUser, error };
};

const resendCode = (email) => {
  return Auth.resendSignUp(email);
};

const confirmRegistration = (email, code) => {
  return Auth.confirmSignUp(email, code);
};

const resetPassword = (email) => {
  return Auth.forgotPassword(email);
};

const confirmNewPassword = ({ email, code, password }) => {
  return Auth.forgotPasswordSubmit(email, code, password);
};

const updateUserProfile = (details) => {
  return Auth.currentAuthenticatedUser({ bypassCache: true }).then((user) =>
    Auth.updateUserAttributes(user, {
      ...details,
    })
  );
};

const deleteAccount = async () => {
  const user = await Auth.currentAuthenticatedUser();
  user.deleteUser(async (error) => {
    if (error) {
      return "Problem deleting account";
    } else {
      return axiosInstance.delete(`/users?email=${user.attributes.email}`);
    }
  });
};

export {
  useRegister,
  useSignIn,
  signOut,
  useLoggedInUser,
  resendCode,
  confirmRegistration,
  resetPassword,
  confirmNewPassword,
  updateUserProfile,
  deleteAccount,
};
