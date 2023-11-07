import {StyleSheet, Text, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import React, {useState} from 'react';
import { COLORS } from '../Constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
// import endpoint from '../utils/endpoint';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../Constants/images';

const ChatHeader = ({userData, onBackPress, onBlockPress, onDeletePress, blocked, onUnblockPress}) => {
  const [openOptions, setOpenOptions] = useState(false)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <AntDesign name='arrowleft' size={25} color={'black'} style={{paddingRight: 15, paddingLeft: 5, paddingVertical: 10, marginRight: 5}} onPress={onBackPress} />
      <FastImage
        style={styles.image}
        source={images.petAvatar}
      />
      <Text style={styles.name}>{userData.user_name}</Text>

      <TouchableOpacity activeOpacity={0.6} onPress={() => setOpenOptions(!openOptions)} style={styles.dotsCont}>
        <Entypo name="dots-three-vertical" size={20} color={COLORS.black}/>
      </TouchableOpacity>

      <View style={[styles.optionsCont, !openOptions ? {display: 'none'} : null]}>
          <TouchableOpacity onPress={() =>  {
              {blocked ? onUnblockPress() : onBlockPress()}
              setOpenOptions(false)
          }}><Text style={styles.text}>{blocked ? 'Unblock' : 'Block'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => {
              onDeletePress()
              setOpenOptions(false)
          }}><Text style={[styles.text, {borderBottomWidth: 0}]}>Delete Chat</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.primary_border,
    height: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.secondary,
  },
  image: {
    width: wp('12%'),
    height: hp('5%'),
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
  },
  name: {
    color: COLORS.secondary_with_opacity,
    marginLeft: 10,
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  dotsCont: {
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    right: 10
  },
  options: {
    position: 'absolute',
    right: 10,
    padding: 5
  },
  optionsCont: {
      borderWidth: 1,
      // padding: 15,
      position: 'absolute',
      top: 50, right: 15,
      backgroundColor: 'white',
      borderRadius: 8
  },
  text: {
      color:'black',
      padding: 7.5,
      borderBottomWidth: 1
  }
});
