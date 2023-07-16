import React from "react";
import { TouchableOpacity } from "react-native";
import { Layout, Text, Icon } from "@ui-kitten/components";
import { styles } from "../../style";
import { useLoggedInUser } from "../../lib/amplify-auth";
import { HeadingText, ThemedText } from "../../lib/components";

const homeNavOptions = ({ navigation }) => ({
  headerLeft: () => null,
  headerRight: () => (
    <TouchableOpacity
      style={styles.backArrow}
      onPress={() => navigation.navigate("settings")}
    >
      <Icon
        name="settings-2-outline"
        fill="#fff"
        style={{ width: 22, height: 22 }}
      />
    </TouchableOpacity>
  ),
});

const Home = () => {
  const { user, error: userError } = useLoggedInUser();

  return (
    <Layout style={styles.container}>
      <HeadingText>Welcome, {user?.attributes.given_name}</HeadingText>
      <ThemedText>Go on, build an awesome product!</ThemedText>
    </Layout>
  );
};

export { Home, homeNavOptions };
