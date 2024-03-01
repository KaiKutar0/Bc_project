import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function LanguagePicker() {
  const [open, setOpen] = useState(false);
  const [language, setLanguge] = useState("en");
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "Slovenščina", value: "sk" },
    { label: "Українська", value: "ua" },
  ]);
  const { t } = useTranslation();
  return (
    <View style={{ marginTop: 20, padding: 5 }}>
      <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 5 }}>
        {t("language")}
      </Text>
      <DropDownPicker
        open={open}
        value={language}
        items={items}
        setOpen={setOpen}
        setValue={setLanguge}
        onChangeValue={(v) => i18next.changeLanguage(v)}
        setItems={setItems}
      />
    </View>
  );
}
