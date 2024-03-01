import React from "react";
import { SafeAreaView } from "react-native";
import { styles } from "../styles/styles";
import LanguagePicker from "../components/LanguagePicker";

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.app}>
      <LanguagePicker />
    </SafeAreaView>
  );
}

export default SettingsScreen;
