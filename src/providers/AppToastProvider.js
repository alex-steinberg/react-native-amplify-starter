import { Text, View } from "react-native";
import React from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { colors } from "../style";

const AppToastProvider = ({ children }) => {
  return (
    <ToastProvider
      placement="bottom"
      offset={100}
      // Custom type example
      renderType={{
        success_toast: (toast) => (
          <View
            style={{
              maxWidth: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: colors.light,
              marginVertical: 4,
              borderRadius: 5,
              borderLeftColor: colors.brand,
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.dark,
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: colors.dark, marginTop: 2 }}>
              {toast.message}
            </Text>
          </View>
        ),
        warning_toast: (toast) => (
          <View
            style={{
              maxWidth: "100%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: colors.light,
              marginVertical: 4,
              borderRadius: 5,
              borderLeftColor: colors.brand,
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.dark,
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: colors.dark, marginTop: 2 }}>
              {toast.message}
            </Text>
          </View>
        ),
        danger_toast: (toast) => (
          <View
            style={{
              maxWidth: "100%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: colors.light,
              marginVertical: 4,
              borderRadius: 5,
              borderLeftColor: colors.brand,
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: colors.dark, marginTop: 2 }}>
              {toast.message}
            </Text>
          </View>
        ),
      }}
    >
      {children}
    </ToastProvider>
  );
};

export { AppToastProvider };
