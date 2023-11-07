import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from "react-native-confirmation-code-field";

import Toast from "react-native-toast-message";
import FastImage from "react-native-fast-image";
import BackButton from "../../Components/BackButton";
import CustomText from "../../Components/Text";
import images from "../../Constants/images";
import CustomButton from "../../Components/Button";
import { COLORS } from "../../Constants/theme";
import BasUrl from "../../BasUrl";
import axios from "axios";
import LoaderModal from "../../Components/LoaderModal";

const CELL_COUNT = 5;
const Otp = ({ navigation, route }) => {
  const [count, setCount] = useState(59);
  const [value, setValue] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

    const { id } = route.params;

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="*"
          isLastFilledCell={isLastFilledCell({ index, value })}
        >
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
    }
  }, [count]);

  const CheckingOtp = () => {
    setIsLoader(true);
    let data = JSON.stringify({
      otp: value,
      id: id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BasUrl}/user/verify-otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoader(false);
        console.log(JSON.stringify(response));
        const res = response.data;
        if (res.success === 'true') {
          navigation.navigate("ResetPassword", {id});
          showToast("success", res.message);
        } else {
          showToast("error", res.message);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        showToast("error", error.message);
      });
  };

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BackButton onPressBack={() => navigation.goBack()} />

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            marginHorizontal: 20,
          }}
        >
          <CustomText
            text={"Email Verification"}
            style={{ fontSize: 20, fontWeight: "bold" }}
          />
          <CustomText
            style={{ marginTop: 10 }}
            text={
              " An email has been sent to your registered email address. Enter the verification code below:"
            }
          />

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          <Text style={{ color: COLORS.black, alignSelf: "center" }}>
            00 : {count}
          </Text>
          <CustomText
            text={"Didnt receive a code?"}
            style={{ alignSelf: "center", color: COLORS.black, marginTop: 20 }}
          />
          <CustomText
            text={"Resend Code"}
            style={{
              alignSelf: "center",
              color: COLORS.black,
              marginTop: 10,
            }}
          />
          {
            isLoader ? (
              <LoaderModal />
            ) : (
              <CustomButton
                buttonText={"Verify"}
                onPress={() => {
                  CheckingOtp();
                }}
              />
            )
          }

          <View>
            <Modal isVisible={isModalVisible}>

              <CustomText
                text={"Successfully Verified"}
                style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }}
              />
              <CustomButton
                onPress={() => {
                  navigation.navigate("Login");
                }}
                buttonText={"Back To Login"}
                style={{ width: "80%" }}
              />
            </Modal>
          </View>
        </ScrollView>
      </View>
      <Toast />
    </FastImage>
  );
};

export default Otp;

const styles = StyleSheet.create({
  borderStyleBase: {
      width: 30,
      height: 45,
    },
  
    borderStyleHighLighted: {
      borderColor: '#000000',
    },
  
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'white',
      color: 'black'
    },
  
    underlineStyleHighLighted: {
      borderColor: '#000000',
    },
    codeFieldRoot: {
      marginTop: 40,
      padding: 20,
    },
    cell: {
      width: 60,
      height: 60,
      lineHeight: 40,
      fontSize: 34,
      borderWidth: 2,
      borderColor: COLORS.black,
      textAlign: 'center',
      borderRadius: 15,
      padding: 15,
      color: COLORS.black,
    },
    focusCell: {
      borderColor: '#4E4B66',
    },
  
})