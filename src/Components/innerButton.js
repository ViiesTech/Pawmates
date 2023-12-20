import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../Constants/theme";
import Icon from "../Constants/Icons";

const InnerButton = ({
  style,
  onPress,
  buttonText,
  textStyle,
  icon_view,
  isDisabled = false,
  Lefticon,
  name,
  type,
  color,
  size
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, style]}
        disabled={isDisabled}
      >
        <View style={[styles.row, icon_view]}>
          <Text style={[styles.defaultText, textStyle]}>{buttonText}</Text>
        </View>
          {Lefticon && (
            <Icon
              name={name}
              type={type}
              color={color}
              size={size}
              style={{
                // alignSelf: "flex-end",
                // padding: 15,
                // height:50,
                // marginTop:30
              }}
            />
          )}
      </TouchableOpacity>
    </>
  );
};

export default InnerButton;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: "center",
    width: "98%",
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center",
    borderColor: COLORS.black,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal:20,
    justifyContent: "space-between",

  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  defaultText: {
    color: COLORS.black,
    fontSize: 16,
  },
  icon: {
    width: "12%",
    paddingRight: 30,
  },
});
