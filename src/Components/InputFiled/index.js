import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "../../Constants/theme";

const InputField = ({
  style,
  placeholder,
  onChangeText,
  secureText,
  keyboardType,
  defaultValue,
  onFocus,
  onBlur,
  ref,
  isEdit,
  value,
  returnKeyType,
  multiline,
  textContentType,
}) => {
  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureText}
      style={[styles.input, style]}
      placeholderTextColor={"#949494"}
      defaultValue={defaultValue}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={isEdit}
      returnKeyType={returnKeyType}
      underlineColorAndroid="transparent"
      multiline={multiline}
      textContentType={textContentType}
      cursorColor={COLORS.black}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 20,
    paddingHorizontal: 30,
    color: COLORS.black,
    // backgroundColor: "#73737E",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.black,
    opacity: 0.8,
  },
});

export default InputField;
