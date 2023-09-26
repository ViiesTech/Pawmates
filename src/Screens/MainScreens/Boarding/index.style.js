import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.text_white,
    width: "98%",
    paddingHorizontal: 25,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "600",
  },
  domestic: {
    borderColor: "#707070",
  },
  btn_view: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
