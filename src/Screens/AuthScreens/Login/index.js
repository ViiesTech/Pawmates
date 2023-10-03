import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import { RadioButton } from "react-native-paper";

import Toast from "react-native-toast-message";
import { logInValidationSchema } from "../../../Utills/Validations";
import CustomText from "../../../Components/Text";
import CustomButton from "../../../Components/Button";
import { styles } from "./index.style";
import images from "../../../Constants/images";
import { Formik } from "formik";
import InputField from "../../../Components/InputFiled";
import { COLORS } from "../../../Constants/theme";

const LogIn = ({ navigation }) => {
  const [checked, setChecked] = useState("first");
  const handleRadioButtonChange = (value) => {
    setChecked(value);
  };

  const LogInUser = () => {
    navigation.navigate("MainStack");
  };

  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <View style={{ height: 100 }}></View>
      <ScrollView style={{ flex: 1 }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnMount={true}
          onSubmit={(values, { setSubmitting, setValues }) =>
            LogInUser(values, { setSubmitting, setValues })
          }
          validationSchema={logInValidationSchema}
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
                  text={"Sign In with email or username"}
                  style={styles.screen_title}
                />
                <InputField
                  placeholder={"username or email"}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType={"email-address"}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )}
                <InputField
                  placeholder={"password"}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureText={true}
                  icon={true}
                />
                {errors.password && touched.password && (
                  <CustomText text={errors.password} style={styles.errors} />
                )}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ForgetPassword");
                  }}
                  style={{ alignSelf: "flex-end", marginTop: 10 }}
                >
                  <CustomText
                    text={"forgot password?"}
                    style={{ fontSize: 14 }}
                  />
                </TouchableOpacity>
                <View style={styles.checkView}>
                  <RadioButton
                    value="first"
                    color={COLORS.primary}
                    uncheckedColor="#949494"
                    status={checked === "first" ? "checked" : "unchecked"}
                    onPress={() => handleRadioButtonChange("first")}
                  />
                  <CustomText
                    text={"Sign in as a Pet Owner "}
                    style={styles.termsText}
                  />
                  <RadioButton
                    value="second"
                    color={COLORS.primary}
                    uncheckedColor="#949494"
                    status={checked === "second" ? "checked" : "unchecked"}
                    onPress={() => handleRadioButtonChange("second")}
                  />
                  <CustomText
                    text={"Sign in as a Pet Sitter"}
                    style={styles.termsText}
                  />
                  {/* <TouchableOpacity>
                    <CustomText
                      text={"terms and conditions"}
                      style={styles.termsTxt}
                    />
                  </TouchableOpacity> */}
                </View>

                <CustomButton
                  buttonText={"Sign In"}
                  onPress={() => {
                    handleSubmit(values);
                  }}
                />

                <View style={styles.devider_View} />

                <TouchableOpacity
                  style={{ alignSelf: "center", marginTop: 10 }}
                >
                  <CustomText
                    text={"Don't have an account?"}
                    style={{ fontSize: 14 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUp")}
                  style={[styles.container_create, { marginTop: 30 }]}
                >
                  <CustomText style={styles.txt} text={"Create an account"} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </FastImage>
  );
};

export default LogIn;
