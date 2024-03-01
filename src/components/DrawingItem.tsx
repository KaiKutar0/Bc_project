import { Text, View, Image } from "react-native";
import prettifyNames from "../helpers/prettifyNames";
import { styles } from "../styles/styles";
import { Children } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

export function DrawingItem({
  item,
}: {
  item: { id: string; name: string; image: string };
}) {
  const { t } = useTranslation();
  return (
    <View
      style={{
        marginBottom: 40,
        borderTopWidth: 0.5,
        borderColor: "gray" /*backgroundColor: "blue"*/,
      }}
    >
      <Text
        style={{
          marginLeft: 30,
          marginBottom: 15,
          marginTop: 5,
          fontSize: 30,
          fontWeight: "500",
          // backgroundColor: "pink",
        }}
      >
        {prettifyNames(item.name)}
      </Text>
      <View
        style={{
          // backgroundColor: "green",
          width: 391,
          alignItems: "center",
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <Image
          style={{ width: 340, height: 180 }}
          source={{
            uri: `data:image/jpeg;base64,${item.image}`,
          }}
        />
      </View>
      <Text
        style={{
          marginLeft: 30,
          marginBottom: 15,
          marginTop: 5,
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        {t("describtion") + ": "}
      </Text>
    </View>
  );
}

export default DrawingItem;
