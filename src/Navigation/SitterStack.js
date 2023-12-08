import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/PetSitterFlow/Home";
import YourGender from "../Screens/PetSitterFlow/YourGender";
import AddSitterDetails from "../Screens/PetSitterFlow/AddSitterDetails";
import AddSitterDetails2 from "../Screens/PetSitterFlow/AddSitterDetails2";
import AddPhoto from "../Screens/PetSitterFlow/AddPhoto";
import Profile from "../Screens/PetSitterFlow/Profile";
import Chats from "../Screens/PetSitterFlow/Chats";
import ChatScreen from "../Screens/PetSitterFlow/ChatScreen";
import NotificationScreenn from "../Screens/PetSitterFlow/NotificationScreenn";
import ServicesYouGive from "../Screens/PetSitterFlow/ServicesYouGive";

import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const SitterStack = () => {
  const {user} = useSelector(state => state.authData);
  
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {
        !user.petSitter_update_status ? (
          <>
            <Stack.Screen name="YourGender" component={YourGender} />
            <Stack.Screen name="ServicesYouGive" component={ServicesYouGive} />
            <Stack.Screen name="AddSitterDetails" component={AddSitterDetails} />
            <Stack.Screen name="AddSitterDetails2" component={AddSitterDetails2} />
            <Stack.Screen name="AddPhoto" component={AddPhoto} />
          </>
        ) : null
      }

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="NotificationScreenn" component={NotificationScreenn} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default SitterStack