import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import BackButton from "../../../Components/Back Button";
import { Formik } from "formik";
import CustomText from "../../../Components/Text";
import InputField from "../../../Components/InputFiled";
import CustomButton from "../../../Components/Button";
import images from "../../../Constants/images";
import { resetPasswordValidationSchema } from "../../../Utills/Validations";
import Toast from "react-native-toast-message";
import { styles } from "./index.style";

const ResetPassword = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  //   const { itemId, id } = route.params;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const resetPassword = ({values}) => {
    navigation.navigate("Login");
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
            password: "",
            confirmPassword: "",
          }}
          validateOnMount={true}
            onSubmit={(values, { setSubmitting, setValues }) =>
              resetPassword(values, { setSubmitting, setValues })
            }
          validationSchema={resetPasswordValidationSchema}
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
            <View style={styles.container}>
              <CustomText
                text={"Reset Your Password"}
                style={styles.screen_title}
              />
              <InputField
                placeholder={"password"}
                value={values.password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                secureTextEntry={true}
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
                secureTextEntry={true}
                icon={true}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <CustomText
                  text={errors.confirmPassword}
                  style={styles.errors}
                />
              )}

              <CustomButton
                buttonText={"Submit"}
                onPress={() => {
                  handleSubmit(values);
                }}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </FastImage>
  );
};

export default ResetPassword;
