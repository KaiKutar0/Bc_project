import { StyleSheet } from "react-native";
import { COLORS } from "./variables";
export const styles = StyleSheet.create({
  app: {
    display: "flex",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    display: "flex",
    flex: 1,
  },
  navbar: {
    backgroundColor: COLORS.BG_SECONDARY,
    flex: 0.07,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  body: {
    backgroundColor: COLORS.BG_PRIMARY,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  footer: {
    backgroundColor: COLORS.BG_SECONDARY,
    flex: 0.1,
  },
  textLogo: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 32,
    fontWeight: "800",
  },
  camera: {
    flex: 1,
  },
  cameraButton: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 100,
  },
  search: {
    height: 40,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    borderWidth: 0.8,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  item: {},
});
