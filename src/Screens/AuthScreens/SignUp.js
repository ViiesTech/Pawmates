import { View, Text, TouchableOpacity, ScrollView, Image,StyleSheet } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import images from "../../Constants/images";
import FastImage from "react-native-fast-image";
import { Formik } from "formik";
import InputField from "../../Components/InputField";
import BackButton from "../../Components/BackButton";
import { SignUpValidationSchema } from "../../Utills/Validations";
import Toast from "react-native-toast-message";
import CustomText from "../../Components/Text";
import CustomButton from "../../Components/Button";
import { COLORS } from "../../Constants/theme";
import BasUrl from "../../BasUrl";
import axios from "axios";
import { setLocale } from "yup";
import LoaderModal from "../../Components/LoaderModal";
import BouncyCheckbox from "react-native-bouncy-checkbox";


const SignUp = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [option, setOption] = useState('pet owner')
  const [isLoader, setIsLoader] = useState(false);

  const handleRadioButtonChange = (value) => {
    setOption(value);
  };

  const RegisterUser = async (values) => {
    setIsLoader(true);
    let data = JSON.stringify({
      "name": values.name,
      "email": values.email,
      "password": values.password,
      "user_type": option
    });
    
    let config = {
      method: 'post',
      url: `${BasUrl}/user/register`,
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data
    };
    
    if(checked){
      axios.request(config)
      .then((response) => {
        setIsLoader(false)
  
        if(response.data.success === 'true'){
          showToast('success', 'Account created successfully 😍')
          navigation.navigate('Login')
        }else {
          showToast('error', response.data.message)
        }
      })
      .catch((error) => {
        setIsLoader(false)
        showToast('error', error.message)
      });
    }else {
      setIsLoader(false)
      showToast('error', 'Please accept the terms and conditions 😊')
    }

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
                    status={option === "pet owner" ? "checked" : "unchecked"}
                    onPress={() => handleRadioButtonChange("pet owner")}
                  />
                  <CustomText
                    text={"Sign up as a Pet Owner "}
                    style={styles.termsText}
                  />
                  <RadioButton
                    value="second"
                    color={COLORS.primary}
                    uncheckedColor="#949494"
                    status={option === "pet sitter" ? "checked" : "unchecked"}
                    onPress={() => handleRadioButtonChange("pet sitter")}
                  />
                  <CustomText
                    text={"Sign up as a Pet Sitter"}
                    style={styles.termsText}
                  />
                </View>

                {/* Terms and conditions checkbox */}
                <View style={styles.checkView}>
                  <BouncyCheckbox
                    size={25}
                    fillColor={COLORS.primary}
                    unfillColor={'white'}
                    iconStyle={{ borderColor: COLORS.primary }}
                    innerIconStyle={{ borderWidth: 2 }}
                    isChecked={checked}
                    onPress={(isChecked) => setChecked(isChecked)}
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

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 30,
  },
  screen_title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  createBtn: {
    borderWidth: 1,
    height: 50,
    borderColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  checkView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText:{
    fontSize:11,
   
  },
  termsTxt:{
    fontSize:11,
    textDecorationLine:'underline'
  },
  termsText:{
    fontSize:14,
   
  },
  errors: {
    fontSize: 11,
    fontWeight: "bold",
    color: "red",
    marginTop: 5,
  },
});