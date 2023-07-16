import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { styles } from "../../style";
import { HeadingText, ThemedText } from "../../lib/components";

export const Landing = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <HeadingText>React Native Amplify Starter</HeadingText>
      <Button appearance="ghost" onPress={() => navigation.navigate("login")}>
        LOG IN
      </Button>
      <Button
        appearance="ghost"
        onPress={() => navigation.navigate("register")}
      >
        REGISTER
      </Button>
    </Layout>
  );
};
