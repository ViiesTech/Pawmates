import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../Constants/theme';
import images from '../Constants/images';
import BackButton from './BackButton';

const Header = ({showSearchIcon = false, onSearchInputPress, onBackPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginVertical: 20,
        // backgroundColor: 'green'
      }}>
      {/* <Image style={{width: 60, height: 60, resizeMode: 'contain', borderRadius: 100}} source={images.petAvatar} /> */}
      <BackButton onPressBack={onBackPress} style={{marginTop: -3, marginLeft: -5}} />

      {showSearchIcon ? (
        <TouchableOpacity activeOpacity={0.6} onPress={onSearchInputPress}>
          <AntDesign name="search1" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
