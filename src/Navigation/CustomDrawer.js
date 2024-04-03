import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { COLORS } from '../Constants/theme';
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { logOut } from '../Redux/authSlice';

const CustomDrawer = ({navigation}) => {
  const dispatch = useDispatch();
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView style={{marginTop: 80}}>
        <TouchableOpacity style={{width: '100%', backgroundColor: COLORS.primary_border, marginVertical: 5, marginLeft:15, borderRadius: 8}} onPress={() => navigation.navigate('Home')}>
          <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black', margin: 20}}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', backgroundColor: COLORS.primary_border, marginVertical: 5, marginLeft:15, borderRadius: 8}} onPress={() => navigation.navigate('FavouritePets')}>
          <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black', margin: 20}}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', backgroundColor: COLORS.primary_border, marginVertical: 5, marginLeft:15, borderRadius: 8}} onPress={() => navigation.navigate('Chats')}>
          <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black', margin: 20}}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', backgroundColor: COLORS.primary_border, marginVertical: 5, marginLeft:15, borderRadius: 8}} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black', margin: 20}}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', backgroundColor: COLORS.primary_border, marginVertical: 5, marginLeft:15, borderRadius: 8}} onPress={() => navigation.navigate('Profile')}>
          <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black', margin: 20}}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', backgroundColor: COLORS.primary_border, marginVertical: 5, marginLeft:15, borderRadius: 8}} onPress={() => navigation.navigate('Calendar')}>
          <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black', margin: 20}}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', backgroundColor: COLORS.primary_border, marginVertical: 5, marginLeft:15, borderRadius: 8}} onPress={() => navigation.navigate('Home')}>
          <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black', margin: 20}}>Your pets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '100%', backgroundColor: COLORS.primary_border, marginVertical: 5, marginLeft:15, borderRadius: 8}} onPress={() => navigation.navigate('Gallery')}>
          <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black', margin: 20}}>Gallery</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      <TouchableOpacity
        onPress={() => {
          Alert.alert('Log out', 'Are you sure, you want to log out?', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => dispatch(logOut())},
          ]);
        }}
        style={{
          alignSelf: 'flex-start',
          backgroundColor: COLORS.secondary_with_opacity,
          borderRadius: 10,
          padding: 10,
          margin:  30,
          paddingHorizontal: 30
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
          Log out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
