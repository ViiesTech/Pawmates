import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../Constants/theme";

const CustomButton = ({
  style,
  onPress,
  buttonText,
  textStyle,
  icon_view,
  isDisabled = false,
  Lefticon,
  name,
  type,
}) => {
  return (
  <>
  
    <TouchableOpacity
    activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, style]}
      disabled={isDisabled}
    >
      <View style={[styles.row, icon_view]}>
        <Text style={[styles.defaultText, textStyle]}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
   
  </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 40,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  defaultText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    width: "12%",
    paddingRight: 30,
  },
});

export default CustomButton;
