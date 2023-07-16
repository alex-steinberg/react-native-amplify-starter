import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Layout, Icon, Button } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../style";
import { signOut } from "../../lib/amplify-auth";
import { storageKey } from "../../constants";
import { HeadingText } from "../../lib/components";

const settingsNavOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      style={styles.backArrow}
      onPress={() => navigation.navigate("home")}
    >
      <Icon name="home-outline" fill="#fff" style={{ width: 22, height: 22 }} />
    </TouchableOpacity>
  ),
});

const Settings = ({ navigation }) => {
  const handleSignOut = async () => {
    await signOut();
    const keysToClear = [...Object.values(storageKey)];
    await AsyncStorage.multiRemove(keysToClear, () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "outside" }],
      });
    });
  };
  return (
    <Layout style={styles.container}>
      <ScrollView
        style={styles.layout}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Layout style={styles.settingsHeader}>
          <HeadingText>settings</HeadingText>
        </Layout>
        <Layout style={styles.settingsActions}>
          <Button
            appearance="ghost"
            onPress={() => navigation.navigate("profile")}
          >
            Update profile
          </Button>
        </Layout>
        <Layout style={styles.settingsActions}>
          <Button appearance="ghost" onPress={handleSignOut}>
            Log out
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export { Settings, settingsNavOptions };
