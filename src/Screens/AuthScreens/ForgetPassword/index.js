import { View, Image, Text } from "react-native";
import React, { useState } from "react";
import { forgetPasswordValidationSchema } from "../../../Utills/Validations";
import CustomText from "../../../Components/Text";
import BackButton from "../../../Components/Back Button";
import { styles } from "./index.style";
import FastImage from "react-native-fast-image";
import images from "../../../Constants/images";
import { Formik } from "formik";
import CustomButton from "../../../Components/Button";
import InputField from "../../../Components/InputFiled";

const ForgetPassword = ({ navigation }) => {
  const forgetUserPassword = () => {
    navigation.navigate("Otp");
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

              <CustomButton
                buttonText={"Submit"}
                onPress={() => {
                  handleSubmit(values);
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </FastImage>
  );
};

export default ForgetPassword;
