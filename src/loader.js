import React from "react";
import { Layout, Spinner, Modal } from "@ui-kitten/components";
import { colors, styles } from "./style";

export const AppLoader = () => {
  return (
    <Layout>
      <Modal visible={true} backdropStyle={styles.backdrop}>
        <Spinner size="giant" style={{ borderColor: colors.brand }} />
      </Modal>
    </Layout>
  );
};
