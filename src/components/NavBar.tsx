import { Text, View } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { AntDesign } from "@expo/vector-icons";

export function NavBar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <View style={{ marginLeft: 10 }}>
        <AntDesign name="arrowleft" size={32} color="#fff" />
      </View>
      <View>
        <Feather
          name="menu"
          size={28}
          color="#fff"
          onPress={navigation.navigate("CameraScreen")}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 20 }}>
        <Text style={styles.textLogo}>Kres</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View>
          <FontAwesome5 name="search" size={32} color="#fff" />
        </View>
        <View style={{ marginLeft: 20 }}>
          <FontAwesome5 name="camera" size={28} color="#fff" />
        </View>
        <View style={{ marginLeft: 10 }}>
          <AntDesign name="arrowright" size={32} color="#fff" />
        </View>
      </View>
    </View>
  );
}

export default NavBar;
