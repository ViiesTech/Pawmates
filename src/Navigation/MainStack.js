import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import ForWhen from "../Screens/MainScreens/ForWhen";
import Service from "../Screens/MainScreens/services";
import WhichAnimal from "../Screens/MainScreens/whichAnimal";
import Boarding from "../Screens/MainScreens/Boarding";
import PetSize from "../Screens/MainScreens/PetSize";
import Home from "../Screens/MainScreens/Home";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ForWhen"
    >
      <Stack.Screen name="ForWhen" component={ForWhen} />
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen name="WhichAnimal" component={WhichAnimal} />
      <Stack.Screen name="Boarding" component={Boarding} />
      <Stack.Screen name="PetSize" component={PetSize} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainStack;
