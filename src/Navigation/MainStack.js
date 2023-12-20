import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import ForWhen from "../Screens/MainScreens/ForWhen";
import Service from "../Screens/MainScreens/Services";
import WhichAnimal from "../Screens/MainScreens/whichAnimal";
import Boarding from "../Screens/MainScreens/Boarding";
import PetSize from "../Screens/MainScreens/PetSize";
import Notifications from "../Screens/MainScreens/Notifications";
import Settings from "../Screens/MainScreens/Settings";
import AddImages from "../Screens/MainScreens/AddImages";
import Home from "../Screens/MainScreens/Home";
import SearchResults from "../Screens/MainScreens/SearchResults";
import Chats from "../Screens/PetSitterFlow/Chats";
import SitterDetails from "../Screens/MainScreens/SitterDetails";

import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const MainStack = () => {
  const {user} = useSelector(state => state.authData);
  
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ user.pet_add_status ? "Home" : "ForWhen"}
    >
      <Stack.Screen name="ForWhen" component={ForWhen} />
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen name="WhichAnimal" component={WhichAnimal} />
      <Stack.Screen name="Boarding" component={Boarding} />
      <Stack.Screen name="PetSize" component={PetSize} />
      <Stack.Screen name="AddImages" component={AddImages} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="SitterDetails" component={SitterDetails} />
    </Stack.Navigator>
  );
};

export default MainStack;
