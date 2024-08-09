import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "../styles/styles";

export function CameraButton({ onClick }: { onClick: () => void }) {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: 50,
        backgroundColor: "white",
        borderRadius: 20,
      }}
    >
      <Text style={{ color: "white" }}>Hi</Text>
      {/* <View style={styles.cameraButton}></View> */}
    </TouchableOpacity>
  );
}

export default CameraButton;
