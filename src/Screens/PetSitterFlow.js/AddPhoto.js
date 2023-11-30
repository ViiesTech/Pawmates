import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TextInput
} from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import CustomText from '../../Components/Text';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../Constants/theme';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/authSlice';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import InnerButton from '../../Components/innerButton';

const AddPhoto = ({navigation}) => {
  return (
    <FastImage source={images.BackGround} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>


      <Text style={[styles.HeadingText, { fontWeight: 'bold' }]}>Location</Text>
      <Text style={{ color: COLORS.black, width: widthPercentageToDP('70%') }}>Lorem ipsum dolor sit amet, consectetur
        adipiscing elit</Text>

      <TouchableOpacity style={{ height: 150, width: 100, backgroundColor: "white", borderRadius: 10, marginTop: 20, alignItems:'center', justifyContent:'center' }}>
        <FontAwesome
          name={"photo"}
          size={30}
          color={'gray'}
        />

        <TouchableOpacity style={{height:30, width:30, backgroundColor:'red', borderRadius:200, position:'absolute', zIndex:10, bottom:-10, right:-10, alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>+</Text>
        </TouchableOpacity>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ height: 60, width: widthPercentageToDP('90%'), alignSelf: 'center', backgroundColor: COLORS.secondary_with_opacity, alignItems: 'center', justifyContent: 'center', borderRadius: 200, marginTop: 20 }}>
        <Text style={{ color: COLORS.text_white }}>Continue</Text>
      </TouchableOpacity>
    </FastImage>
  )
}

export default AddPhoto

const styles = StyleSheet.create({
  HeadingText: {
    color: COLORS.black,
    fontSize: 30
  },
  container: {
    backgroundColor: COLORS.text_white,
    width: '96%',
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40
  },
  header: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '600',
    color: COLORS.black
  },
  domestic: {
    borderColor: '#1EBA1E'
  },
  txtInput: {
    height: 50,
    width: widthPercentageToDP('90%'),
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.text_placeholder,
    borderRadius: 5,
    marginTop: 5
  }
})