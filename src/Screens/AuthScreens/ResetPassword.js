import { View, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import BackButton from "../../Components/BackButton";
import { Formik } from "formik";
import CustomText from "../../Components/Text";
import InputField from "../../Components/InputField";
import CustomButton from "../../Components/Button";
import images from "../../Constants/images";
import { resetPasswordValidationSchema } from "../../Utills/Validations";
import Toast from "react-native-toast-message";
import BasUrl from "../../BasUrl";
import axios from "axios";
import LoaderModal from "../../Components/LoaderModal";

const ResetPassword = ({ navigation, route }) => {
  const [isLoader, setIsLoader] = useState(false);
  const {id} = route.params;


  const resetPassword = (values) => {
    setIsLoader(true)
    let data = JSON.stringify({
      "id": id,
      "password": values.password
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BasUrl}/user/change-password`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      setIsLoader(false)

      if(response.data.success === 'true'){
        showToast('success', response.data.message)
        navigation.navigate('Login')
      }else {
        showToast('error', response.data.message)
      }
    })
    .catch((error) => {
      setIsLoader(false)
      showToast('error', error.message)
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

              {
                isLoader ? (
                  <LoaderModal />
                ) : (
                  <CustomButton
                    buttonText={"Submit"}
                    onPress={() => {
                      handleSubmit(values);
                    }}
                  />
                )
              }

            </View>
          )}
        </Formik>
      </ScrollView>
      <Toast />
    </FastImage>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  container: {
    marginHorizontal: 30,
    marginTop:40,
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
