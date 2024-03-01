import { Text, View } from "react-native";
import { styles } from "../styles/styles";
import { Children } from "react";

export function Body({ children }) {
  return (
    <View style={styles.body}>
      <Text>{children}</Text>
    </View>
  );
}

export default Body;
