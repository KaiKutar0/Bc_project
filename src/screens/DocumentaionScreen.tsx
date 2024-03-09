import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { FlatList, SafeAreaView, TextInput } from "react-native";
import DrawingItem from "../components/DrawingItem";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

enum ElementType {
  GRIPPER = "Gripper",
  LINE_EQUIPMENT = "Line Equipment",
  FITTINGS_N_TUBES = "Fittings and Tubes",
  FLOW_CONTROL_EQUIPMENT = "Flow Control Equipment",
  MECHANICAL_N_AIR_OPERATED_VALVES = "Mechanical and Air Operated Valves",
  PNEUMATIC_ACTUATORS = "Pneumatic Actuators",
  PRESSURE_N_VACUUM_SWITCHES = "Pressure and Vacuum Switches",
  PROCESS_TECHNOLOGY = "Process Technology",
  ROTARY_ACTUATOR = "Rotary actuator",
  SAFETY_PRESSURE_RELEASE_VALVES = "Safety pressure release valves",
  SOLENOID_VALVES = "Solenoid Valves",
  VACUUM_EQUIPMENT = "Vacuum Equipment",
  OTHER = "Other",
}

type Drawing = {
  id: string;
  name_en: string;
  name_sk: string;
  name_ua: string;
  image: string;
  type: ElementType;
  description_en: string;
  description_sk: string;
  description_ua: string;
};

function DocumentationScreen() {
  const [data, setData] = useState<Drawing[]>([]);
  const [term, setTerm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/?term=${term}&lang=${i18next.language}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
    console.log(data);
  }, [term]);

  return (
    <SafeAreaView style={styles.app}>
      <TextInput
        style={styles.search}
        onChangeText={setTerm}
        value={term}
        placeholder={t("search") + "..."}
      />
      <FlatList
        style={{ display: "flex", flex: 1 /*backgroundColor: "gray"*/ }}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <DrawingItem item={item} />}
      />
    </SafeAreaView>
  );
}

export default DocumentationScreen;
