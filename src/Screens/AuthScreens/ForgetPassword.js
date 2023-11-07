import { View, Image, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { forgetPasswordValidationSchema } from "../../Utills/Validations";
import CustomText from "../../Components/Text";
import BackButton from "../../Components/BackButton";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import { Formik } from "formik";
import CustomButton from "../../Components/Button";
import InputField from "../../Components/InputField";
import BasUrl from "../../BasUrl";
import LoaderModal from "../../Components/LoaderModal";
import axios from "axios";
import Toast from "react-native-toast-message";

const ForgetPassword = ({ navigation }) => {
  const [isLoader, setIsLoader] = useState(false);

  const forgetUserPassword = async (values, { setValues }) => {
    setIsLoader(true);
    let data = JSON.stringify({
      email: values.email,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BasUrl}/user/email-verification`,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        setIsLoader(false);
        console.log("Otp data ------>    ", response.data)

        if (response.data.success === "true") {
          navigation.navigate("Otp", {id: response.data.id});
          showToast('success', response.data.message);
          setValues({ email: "" });

        } else {
          showToast('error', response.data.message);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        showToast('error', error.message);
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
      <Formik
        initialValues={{ email: "" }}
        validateOnMount={true}
        onSubmit={(values, { setValues }) =>
          forgetUserPassword(values, { setValues })
        }
        validationSchema={forgetPasswordValidationSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <View style={styles.main_container}>
            <BackButton onPressBack={() => navigation.goBack()} />
            <View style={{ height: 80 }}></View>
            <View style={styles.container}>
              <CustomText
                text={"Enter Your Email"}
                style={styles.screen_title}
              />
              <InputField
                placeholder={"Email"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType={"email-address"}
                // isEdit={false}
              />
              {errors.email && touched.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              {isLoader ? (
                <LoaderModal />
              ) : (
                <CustomButton
                  buttonText={"Submit"}
                  onPress={() => {
                    handleSubmit(values);
                  }}
                />
              )}
            </View>
          </View>
        )}
      </Formik>
    </FastImage>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  container: {
    marginHorizontal: 30,
    marginTop:20,
    justifyContent:"center",
    alignContent:'center',
  },
  screen_title:{
    marginTop:30,
    fontSize:25,
    fontWeight:'bold'
  },
  createBtn:{
    borderWidth:1,
    height:50,
    borderColor: 'white',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginTop:30
  },
  errors: {
    fontSize: 11,
    fontWeight: "bold",
    color: "red",
    marginTop: 5,
  },
});

