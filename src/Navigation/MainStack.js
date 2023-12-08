import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import ForWhen from "../Screens/MainScreens/ForWhen";
import Service from "../Screens/MainScreens/Services";
import WhichAnimal from "../Screens/MainScreens/whichAnimal";
import Boarding from "../Screens/MainScreens/Boarding";
import PetSize from "../Screens/MainScreens/PetSize";
import PetRequests from "../Screens/MainScreens/PetRequests";
import Settings from "../Screens/MainScreens/Settings";
import AddImages from "../Screens/MainScreens/AddImages";

import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const MainStack = () => {
  const {user} = useSelector(state => state.authData);

  
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ForWhen"
    >
      {
        !user.pet_add_status ? (
          <>
            <Stack.Screen name="ForWhen" component={ForWhen} />
            <Stack.Screen name="Service" component={Service} />
            <Stack.Screen name="WhichAnimal" component={WhichAnimal} />
            <Stack.Screen name="Boarding" component={Boarding} />
            <Stack.Screen name="PetSize" component={PetSize} />
            <Stack.Screen name="AddImages" component={AddImages} />
          </>
        ) : null
      }
      <Stack.Screen name="PetRequests" component={PetRequests} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default MainStack;
