import React, { useState } from "react";
import { StyleSheet, TextInput, View,TouchableOpacity } from "react-native";
import { COLORS } from "../../Constants/theme";
import Feather from "react-native-vector-icons/Feather";

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
  icon,
}) => {
  const [passwordHide, setpasswordHide] = useState(secureText);

  return (
    <View>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={passwordHide}
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
      {icon && (
        <TouchableOpacity
          style={styles.Righticon}
          onPress={() => setpasswordHide(!passwordHide)}
        >
          {passwordHide ? (
            <Feather name="eye" size={22} color={"gray"} />
          ) : (
            <Feather name="eye-off" size={22} color={"gray"} />
          )}
        </TouchableOpacity>
      )}
    </View>
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
  Righticon: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 15,
    marginTop: 20,
  },
});

export default InputField;
