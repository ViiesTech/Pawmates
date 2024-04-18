import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../Constants/theme';
import InnerButton from '../../Components/innerButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {logOut} from '../../Redux/authSlice';

const Settings = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <AntDesign
        name="arrowleft"
        size={25}
        color={'black'}
        style={{
          margin: 15,
          padding: 8,
          backgroundColor: 'rgba(0,0,0,0.1)',
          alignSelf: 'flex-start',
          borderRadius: 250,
        }}
        onPress={() => navigation.goBack()}
      />
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
        onPress={() => navigation.navigate('ForWhen')}
        buttonText={'Add Pet'}
        style={{width: wp('90%')}}
        textStyle={{fontWeight: 'bold'}}
        Lefticon={true}
        type={'ant-design'}
        name={'right'}
        size={25}
        color={'black'}
      />

      <InnerButton
        onPress={() => Alert.alert('Log out alert!', 'Are you sure, you want to log out?', [
          {
            text: 'Yes',
            onPress: () => dispatch(logOut())
          }
        ])}
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
