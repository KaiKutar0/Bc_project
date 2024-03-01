import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "../styles/styles";

export function Body() {
  return (
    <TouchableOpacity>
      <Text style={{ color: "white" }}>Hi</Text>
      {/* <View style={styles.cameraButton}></View> */}
    </TouchableOpacity>
  );
}

export default Body;
