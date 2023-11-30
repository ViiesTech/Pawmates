import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/MainScreens/Home";
import YourGender from "../Screens/PetSitterFlow.js/YourGender";
import AddLocation from "../Screens/PetSitterFlow.js/AddLocation";
import AddPhoto from "../Screens/PetSitterFlow.js/AddPhoto";
import Profile from "../Screens/PetSitterFlow.js/Profile";
import Chats from "../Screens/MainScreens/Chats";
import NotificationScreenn from "../Screens/PetSitterFlow.js/NotificationScreenn";

const Stack = createStackNavigator();


const SitterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="YourGender"
    >
      <Stack.Screen name="YourGender" component={YourGender} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
      <Stack.Screen name="AddPhoto" component={AddPhoto} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="NotificationScreenn" component={NotificationScreenn} />

    </Stack.Navigator>
  );
}

export default SitterStack