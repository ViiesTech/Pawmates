import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import CustomDrawer from "./CustomDrawer";

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
import { createDrawerNavigator } from '@react-navigation/drawer';
import Calendar from "../Screens/PetSitterFlow/Calendar";
import Gallery from "../Screens/PetSitterFlow/Gallery";
import EditProfile from "../Screens/PetSitterFlow/EditProfile";
import AddGalleryImages from "../Screens/PetSitterFlow/AddGalleryImages";
import FavouritePets from "../Screens/PetSitterFlow/FavouritePets";

import { useSelector } from "react-redux";
import Dashboard from "../Screens/PetSitterFlow/Dashboard";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={props => <CustomDrawer {...props} />} >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  )
}

const SitterStack = () => {
  const {user} = useSelector(state => state.authData);
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="NotificationScreenn" component={NotificationScreenn} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="FavouritePets" component={FavouritePets} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="AddGalleryImages" component={AddGalleryImages} />
      <Stack.Screen name="Calendar" component={Calendar} />
    </Stack.Navigator>
  )
}

export default SitterStack;