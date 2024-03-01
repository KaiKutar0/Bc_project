import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { FlatList, SafeAreaView, TextInput } from "react-native";
import DrawingItem from "../components/DrawingItem";
import { useTranslation } from "react-i18next";

type Drawing = {
  id: string;
  name: string;
  image: string;
};

function DocumentationScreen() {
  const [data, setData] = useState<Drawing[]>([]);
  const [term, setTerm] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/drawing?term=${term}`)
      .then((response) => response.json())
      .then((data) => setData(data.drawings))
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
        renderItem={({ item }) => (
          <DrawingItem
            item={{
              id: item[0],
              name: item[1],
              image: item[2],
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default DocumentationScreen;
