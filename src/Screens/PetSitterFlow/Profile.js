import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../Constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import BasUrl from '../../BasUrl';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import CustomButton from '../../Components/Button';

const Profile = ({navigation}) => {
  const {user, token} = useSelector(state => state.authData);
  const [completeUserInfo, setCompleteUserInfo] = useState({});

  const getProfileInfo = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BasUrl}/user/get-profile-info`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.success) {
          setCompleteUserInfo(response.data.data);
        } else {
          Toast.show({
            type: 'error',
            text1: response.data.message,
          });
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfileInfo();
    });

    return unsubscribe;
  }, [navigation]);

  if (Object.values(completeUserInfo).length <= 0) {
    return <ActivityIndicator size={50} color={'black'} />;
  }

  return (
    <FastImage
      source={images.BackGround}
      style={{flex: 1}}>
      
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={{paddingRight: 5}}>
          <AntDesign name="arrowleft" size={30} color={'black'} />
        </TouchableOpacity>
        <CustomButton
          onPress={() => navigation.navigate('EditProfile', {completeUserInfo})}
          buttonText={'Edit'}
          style={styles.buttonStyle}
        />
      </View>

      <View
        style={styles.profileImageCont}>
        {user?.profileImage ? (
          <Image
            source={{uri: `${BasUrl}/${user.profileImage}`}}
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          <Ionicons name={'person'} size={40} color={'gray'} />
        )}
      </View>
      <Text
        style={[
          styles.HeadingText,
          {fontWeight: 'bold', alignSelf: 'center', marginTop: 20},
        ]}>
        {user.name}
      </Text>

      {/* Images  */}
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <View
          style={{
            height: 210,
            width: 140,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginRight: 5,
            overflow: 'hidden',
          }}>
          {completeUserInfo?.images[0] ? (
            <Image
              source={{uri: `${BasUrl}/${completeUserInfo.images[0]}`}}
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <Ionicons name={'person'} size={40} color={'gray'} />
          )}
        </View>

        <View>
          <View
            style={{
              height: 100,
              width: 90,
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              overflow: 'hidden',
            }}>
            {completeUserInfo?.images[1] ? (
              <Image
                source={{uri: `${BasUrl}/${completeUserInfo.images[1]}`}}
                style={{width: '100%', height: '100%'}}
              />
            ) : (
              <Ionicons name={'person'} size={40} color={'gray'} />
            )}
          </View>
          <View
            style={{
              height: 100,
              width: 90,
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              overflow: 'hidden',
            }}>
            {completeUserInfo?.images[2] ? (
              <Image
                source={{uri: `${BasUrl}/${completeUserInfo.images[2]}`}}
                style={{width: '100%', height: '100%'}}
              />
            ) : (
              <Ionicons name={'person'} size={40} color={'gray'} />
            )}
          </View>
        </View>

        <View style={{marginLeft: 5}}>
          <View
            style={{
              height: 100,
              width: 90,
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              overflow: 'hidden',
            }}>
            {completeUserInfo?.images[3] ? (
              <Image
                source={{uri: `${BasUrl}/${completeUserInfo.images[3]}`}}
                style={{width: '100%', height: '100%'}}
              />
            ) : (
              <Ionicons name={'person'} size={40} color={'gray'} />
            )}
          </View>
          <View
            style={{
              height: 100,
              width: 90,
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              overflow: 'hidden',
            }}>
            {completeUserInfo?.images[4] ? (
              <Image
                source={{uri: `${BasUrl}/${completeUserInfo.images[4]}`}}
                style={{width: '100%', height: '100%'}}
              />
            ) : (
              <Ionicons name={'person'} size={40} color={'gray'} />
            )}
          </View>
        </View>
      </View>

      <View
        style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('2%')}}>
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20}]}>
          About
        </Text>
        <Text style={{color: COLORS.black, fontSize: hp('1.7%')}}>{completeUserInfo.about}</Text>
      </View>

      <View
        style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('1%')}}>
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20}]}>
          Gender
        </Text>
        <Text style={{color: COLORS.black, fontSize: hp('1.7%')}}>{completeUserInfo.gender}</Text>
      </View>

      <View
        style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('1%')}}>
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20}]}>
          Age
        </Text>
        <Text style={{color: COLORS.black, fontSize: hp('1.7%')}}>{completeUserInfo.age}</Text>
      </View>

      <View
        style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('1%')}}>
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20}]}>
          Services you provide
        </Text>

        <View style={{flexDirection :'row', width: '100%', alignSelf: 'center', flexWrap: 'wrap', marginTop: hp('1%'), marginLeft: -10}}>
            {
              completeUserInfo?.petPurposeType.map(eachPurpose => (
                <Text style={{color: 'black', backgroundColor: 'lightgrey', paddingVertical: 10, paddingHorizontal: 20, margin: 3, borderRadius: 12}}>{eachPurpose}</Text>
              ))
            }
        </View>
      </View>

      <View
        style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('1%')}}>
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20}]}>
          Animals you can provide services for
        </Text>

        <View style={{flexDirection :'row', width: '100%', alignSelf: 'center', flexWrap: 'wrap', marginTop: hp('1%'), marginLeft: -10}}>
            {
              completeUserInfo?.categoryName.map(eachPurpose => (
                <Text style={{color: 'black', backgroundColor: 'lightgrey', paddingVertical: 10, paddingHorizontal: 20, margin: 3, borderRadius: 12}}>{eachPurpose}</Text>
              ))
            }
        </View>
      </View>

      <View
        style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('1%')}}>
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20}]}>
          Pet sizes you can take
        </Text>

        <View style={{flexDirection :'row', width: '100%', alignSelf: 'center', flexWrap: 'wrap', marginTop: hp('1%'), marginLeft: -10}}>
            {
              completeUserInfo?.pet_size.map(eachPurpose => (
                <Text style={{color: 'black', backgroundColor: 'lightgrey', paddingVertical: 10, paddingHorizontal: 20, margin: 3, borderRadius: 12}}>{eachPurpose}</Text>
              ))
            }
        </View>
      </View>


      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 60,
          width: wp('90%'),
          alignSelf: 'center',
          backgroundColor: COLORS.secondary_with_opacity,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 200,
          marginTop: 20,
        }}>
        <Text style={{color: COLORS.text_white}}>Continue</Text>
      </TouchableOpacity> */}
      </ScrollView>
    </FastImage>
  );
};

export default Profile;

const styles = StyleSheet.create({
  HeadingText: {
    color: COLORS.black,
    fontSize: 20,
  },
  container: {
    backgroundColor: COLORS.text_white,
    width: '96%',
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  domestic: {
    borderColor: '#1EBA1E',
  },
  txtInput: {
    height: 50,
    width: wp('90%'),
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.text_placeholder,
    borderRadius: 5,
    marginTop: 5,
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: '25%',
    marginTop: 0,
    padding: 10,
    backgroundColor: 'black',
    height: 40,
  },
  profileImageCont: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  }
});
