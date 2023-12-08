import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import { RadioButton } from "react-native-paper";

import Toast from "react-native-toast-message";
import { logInValidationSchema } from "../../Utills/Validations";
import CustomText from "../../Components/Text";
import CustomButton from "../../Components/Button";
import images from "../../Constants/images";
import { Formik } from "formik";
import InputField from "../../Components/InputField";
import { COLORS } from "../../Constants/theme";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoaderModal from "../../Components/LoaderModal";
import BasUrl from "../../BasUrl";
import { UserLogin } from "../../Redux/authSlice";

const LogIn = ({ navigation }) => {
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authData.isLoading);

  const LogInUser = async (values, { setSubmitting, setValues }) => {
    let data = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    let config = {
      method: "post",
      url: `${BasUrl}/user/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    dispatch(UserLogin(config));
  };
  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
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
                  secureText={false}
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
                {loading ? (
                  <LoaderModal />
                ) : (
                  <CustomButton
                    buttonText={"Sign In"}
                    onPress={() => {
                      handleSubmit(values);
                    }}
                  />
                )}

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

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  container: {
    marginHorizontal: 30,
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
  },
  devider_View:{
    height:2,
    backgroundColor:'#D4D4D4',
    marginTop:30,
    borderRadius:10
  },
  container_create: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor:COLORS.black,
    borderRadius:10,
    marginTop:10,
    alignContent:'center',
    flexDirection:'row'
  },
  txt:{
    color:COLORS.text_white
  },
  errors: {
    fontSize: 11,
    fontWeight: "bold",
    color: "red",
    marginTop: 5,
  },
  checkView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText:{
    fontSize:11,
   
  },
});