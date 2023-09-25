import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import images from "../../../Constants/images";
import FastImage from "react-native-fast-image";
import { Formik } from "formik";
import InputField from "../../../Components/InputFiled";
import { styles } from "./index.style";
import BackButton from "../../../Components/Back Button";
import { SignUpValidationSchema } from "../../../Utills/Validations";
import Toast from "react-native-toast-message";
import CustomText from "../../../Components/Text";
import CustomButton from "../../../Components/Button";
import { COLORS } from "../../../Constants/theme";

const SignUp = ({ navigation }) => {
  const [checked, setChecked] = useState("first");
  const [isLoader, setIsLoader] = useState(false);

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };
  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
        <BackButton onPressBack={() => navigation.goBack()} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 100 }}></View>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validateOnMount={true}
          // onSubmit={(values, { setSubmitting, setValues }) =>
          //   RegistorUser(values, { setSubmitting, setValues })
          // }
          validationSchema={SignUpValidationSchema}
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
              <View style={styles.container}>
                <CustomText
                  text={"Create an account"}
                  style={styles.screen_title}
                />
                <InputField
                  placeholder={"Full Name"}
                  value={values.name}
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                />
                {errors.name && touched.name && (
                  <CustomText text={errors.name} />
                )}
                <InputField
                  placeholder={"Email Address"}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                />
                {errors.email && touched.email && (
                  <CustomText text={errors.email} />
                )}
                <InputField
                  placeholder={"password"}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <CustomText text={errors.password} />
                )}

                <InputField
                  placeholder={"Re-type Password"}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  secureTextEntry
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <CustomText text={errors.confirmPassword} />
                )}
                <View style={styles.checkView}>
                  <RadioButton
                    value="first"
                    color={COLORS.primary}
                    uncheckedColor="#949494"
                    status={checked === "first" ? "checked" : "unchecked"}
                  />
                  <CustomText
                    text={"I have read and accept the "}
                    style={styles.termsText}
                  />
                  <TouchableOpacity>
                    <CustomText
                      text={"terms and conditions"}
                      style={styles.termsTxt}
                    />
                  </TouchableOpacity>
                </View>

                <CustomButton
                  onPress={() => {
                    // RegistorUser()
                    // handleSubmit(values);
                    navigation.navigate("Login");
                  }}
                  buttonText={"Create an account"}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </FastImage>
  );
};

export default SignUp;
