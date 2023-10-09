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
import BasUrl from "../../../BasUrl";
import axios from "axios";
import { setLocale } from "yup";
import LoaderModal from "../../../Components/LoaderModal";
const SignUp = ({ navigation }) => {
  const [checked, setChecked] = useState("first");
  const [isLoader, setIsLoader] = useState(false);

  const RegisterUser = async (values, { setValues }) => {
    setIsLoader(true);
    let data = JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
      user_type: "Owner",
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BasUrl}user/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        setIsLoader(false);
        navigation.navigate("Login");
        showToast('success', response.data.message)
        console.log("responseeeeeeeeee ==>>>>>>>", response.data);
      })
      .catch((error) => {
        setIsLoader(false);
        console.log("errrorrrrrrrrr ===>>>>>>>>", error);
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
          onSubmit={(values, { setSubmitting, setValues }) =>
            RegisterUser(values, { setSubmitting, setValues })
          }
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
                  secureText={false}
                />
                {errors.name && touched.name && (
                  <CustomText text={errors.name} style={styles.errors} />
                )}
                <InputField
                  placeholder={"Email Address"}
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  secureText={false}
                />
                {errors.email && touched.email && (
                  <CustomText text={errors.email} style={styles.errors} />
                )}
                <InputField
                  placeholder={"password"}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  secureText={true}
                  icon={true}
                />
                {errors.password && touched.password && (
                  <CustomText text={errors.password} style={styles.errors} />
                )}

                <InputField
                  placeholder={"Re-type Password"}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  secureText={true}
                  icon={true}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <CustomText
                    text={errors.confirmPassword}
                    style={styles.errors}
                  />
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
                {isLoader ? (
                  <LoaderModal />
                ) : (
                  <CustomButton
                    onPress={() => {
                      // RegistorUser()
                      handleSubmit(values);
                    }}
                    buttonText={"Create an account"}
                  />
                )}
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
