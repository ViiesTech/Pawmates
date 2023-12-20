import React, {useState} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../Constants/theme';
import Feather from 'react-native-vector-icons/Feather';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const InputField = ({
  style,
  placeholder,
  onChangeText,
  secureText = false,
  keyboardType,
  defaultValue,
  onFocus,
  onBlur,
  ref,
  isEdit,
  value,
  returnKeyType,
  multiline,
  numberOfLines,
  textContentType,
  icon,
}) => {
  const [passwordHide, setpasswordHide] = useState(secureText);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        width: widthPercentageToDP('90%'),
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: COLORS.black,
        marginTop: 20
      }}>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={'rgba(0,0,0,0.7)'}
        secureTextEntry={secureText && passwordHide}
        style={[styles.input, style]}
        defaultValue={defaultValue}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={isEdit}
        returnKeyType={returnKeyType}
        underlineColorAndroid="transparent"
        multiline={multiline}
        numberOfLines={numberOfLines}
        textContentType={textContentType}
        cursorColor={COLORS.black}
      />
      {icon && (
        <TouchableOpacity
          style={styles.Righticon}
          onPress={() => setpasswordHide(!passwordHide)}>
          {passwordHide ? (
            <Feather name="eye" size={22} color={'gray'} />
          ) : (
            <Feather name="eye-off" size={22} color={'gray'} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '88%',
    padding: 20,
    color: COLORS.black,
    opacity: 0.8,
  },
  Righticon: {
    // padding: 15,
  },
});

export default InputField;
