import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import GoThrough from '../Screens/AuthScreens/GoThrough';
import LogIn from '../Screens/AuthScreens/Login';
import SignUp from '../Screens/AuthScreens/SignUp';
import ForgetPassword from '../Screens/AuthScreens/ForgetPassword';
import Otp from '../Screens/AuthScreens/Otp';
import ResetPassword from '../Screens/AuthScreens/ResetPassword';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="GoThrough">
      <Stack.Screen name="GoThrough" component={GoThrough} />
      <Stack.Screen name="Login" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
     
    </Stack.Navigator>
  );
};

export default AuthStack;
