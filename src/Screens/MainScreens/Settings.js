import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../Constants/theme';
import InnerButton from '../../Components/innerButton';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/authSlice';

const Settings = () => {
    const dispatch = useDispatch();
    
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20,
          width: wp('90%'),
          alignSelf: 'center',
        }}>
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: 25}]}>
          Settings
        </Text>
      </View>

      <InnerButton
        onPress={() => dispatch(logOut())}
        buttonText={'Log out'}
        style={{
          width: wp('90%'),
          alignSelf: 'center',
          backgroundColor: '#AC3A39',
          borderWidth: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        textStyle={{color: 'white', fontWeight: 'bold'}}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  HeadingText: {
    color: COLORS.black,
    fontSize: 15,
  },
});
