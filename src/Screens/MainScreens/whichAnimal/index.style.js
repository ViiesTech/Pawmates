import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.text_white,
    width: "98%",
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "600",
  },
  domestic: {
    borderColor: "#1EBA1E",
  },
  flatlist_container: {
    flex: 1,
  },
  Data_View: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderColor: "rgba(112, 112, 112,100)",
    width: "90%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
});
