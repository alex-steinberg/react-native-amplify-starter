import { Spinner } from "@ui-kitten/components";
import { View, Text } from "react-native";
import React from "react";
import { styles as globalStyles } from "../style";

export const ThemedText = ({ styles, children }) => {

  return <Text style={[styles, globalStyles.text]}>{children}</Text>;
};

export const HeadingText = ({children}) => {
  return <ThemedText styles={{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24
  }}>{children}</ThemedText>
}

export const LoadingIndicator = ({ loadingText }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Spinner size="small" status="control" style={{ borderColor: "white" }} />
    <Text
      style={{
        marginLeft: 8,
        textTransform: "uppercase",
        color: "white",
        fontWeight: "bold",
        fontFamily: "Montserrat-Bold",
      }}
    >
      {loadingText}
    </Text>
  </View>
);
