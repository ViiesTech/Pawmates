import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { StatusBar } from "react-native";

const Route = () => {
  const Stack = createStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#FFF6E4",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        animated={true}
        backgroundColor="#FFF6E4"
        barStyle={"dark-content"}
      />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="AuthStack"
      >
        <Stack.Screen name="MainStack" component={MainStack} />

        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
