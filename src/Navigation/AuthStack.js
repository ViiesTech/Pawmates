import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import GoThrough from "../Screens/AuthScreens/GoThrough";
import LogIn from "../Screens/AuthScreens/Login";
import SignUp from "../Screens/AuthScreens/SignUp";
import ForgetPassword from "../Screens/AuthScreens/ForgetPassword";
import Otp from "../Screens/AuthScreens/Otp";
import ResetPassword from "../Screens/AuthScreens/ResetPassword";
import IconScreen from "../Screens/AuthScreens/IconScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="GoThrough" component={GoThrough} />
      <Stack.Screen name="Login" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="IconScreen" component={IconScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
