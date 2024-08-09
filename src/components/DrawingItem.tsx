import { Text, View, Image } from "react-native";
import { prettifyNames } from "../helpers/helpers";
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

export function DrawingItem({ item }: { item: Drawing }) {
  const { t } = useTranslation();
  return (
    <View
      style={{
        marginBottom: 40,
        marginLeft: 30,
        marginRight: 30,
        borderBottomWidth: 0.5,
        borderColor: "gray" /*backgroundColor: "blue"*/,
      }}
    >
      <Text
        style={{
          marginBottom: 15,
          marginTop: 5,
          fontSize: 30,
          fontWeight: "500",
          // backgroundColor: "pink",
        }}
      >
        {i18next.language === "en" && prettifyNames(item.name_en)}
        {i18next.language === "sk" && prettifyNames(item.name_sk)}
        {i18next.language === "ua" && prettifyNames(item.name_ua)}
      </Text>
      <View
        style={{
          // backgroundColor: "green",
          width: 345,
          alignItems: "center",
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <Image
          style={{
            width: 320,
            height: 180,
            resizeMode: "contain",
            borderColor: "black",
            backgroundColor: "white",
            borderWidth: 0.2,
            borderRadius: 10,
          }}
          source={{
            uri: `data:image/jpeg;base64,${item.image}`,
          }}
        />
      </View>
      <Text>{"type:\n" + item.type}</Text>
      <Text
        style={{
          // marginLeft: 30,
          marginBottom: 15,
          marginTop: 5,
          fontSize: 15,
          fontWeight: "500",
          textAlign: "justify",
        }}
      >
        {i18next.language === "en" &&
          t("describtion") + ":\n" + item.description_en}
        {i18next.language === "sk" &&
          t("describtion") + ":\n" + item.description_sk}
        {i18next.language === "ua" &&
          t("describtion") + ":\n" + item.description_ua}
      </Text>
    </View>
  );
}

export default DrawingItem;
