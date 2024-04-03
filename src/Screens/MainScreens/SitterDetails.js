import {View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../Constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import BasUrl from '../../BasUrl';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import CustomButton from '../../Components/Button';
import { ActivityIndicator } from 'react-native-paper';


const SitterDetails = ({navigation, route}) => {
  const {sitterData, petId} = route.params;
  const {token} = useSelector(state => state.authData);
  const [loading, setLoading] = useState(false)

  const handleRequestSend = (sitterId, petsId) => {
    let data = JSON.stringify({
      pet_id: petsId,
      receive_sitter_id: sitterId
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BasUrl}/pet/owner-req-send`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data : data
    };
    
    setLoading(true)
    axios.request(config)
    .then((response) => {
      setLoading(false)
      if(response.data.success){
        navigation.navigate('Home')
        Toast.show({
          type: 'success',
          text1: 'Hiring Request Sent Successfully 😊',
          text2: 'Your hiring request has been sent to the sitter'
        })
      }else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message
        })
      }
    })
    .catch((error) => {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message
      })
    });
  }


  return (
    <FastImage source={images.BackGround} style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 25,
          width: wp('90%'),
          alignSelf: 'center'
        }}>
        <AntDesign
          name="arrowleft"
          size={25}
          color={'black'}
          onPress={() => navigation.goBack()}
          style={{
            padding: 8,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 250,
          }}
        />
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: 25}]}>Sitter Details</Text>
      </View>

      {
        loading ? (
          <ActivityIndicator size={100} color='black' />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}>
            <View style={{height: 240, paddingLeft: 10}}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                  {
                      sitterData.images.map((eachUri, index ) => {
                          return (
                              <Image source={{uri: `${BasUrl}/${eachUri}`}} key={index} style={{width: 200, height: 230, marginHorizontal: 6, backgroundColor: 'lightgrey', borderRadius: 8}} />
                          )
                      })
                  }
              </ScrollView>
            </View>

            <Text style={{color: 'black', fontSize: hp('4%'), width: wp('90%'), alignSelf: 'center', fontWeight:'bold'}}>{sitterData.name} . {sitterData.age}</Text>
            <Text style={{color: 'black', marginTop: 15, fontSize: hp('2%'), width: wp('88%'), alignSelf: 'center', fontWeight: 'bold'}}>About Sitter</Text>
            <Text style={{color: 'rgba(0,0,0,0.7)', fontSize: hp('2%'), width: wp('90%'), alignSelf: 'center', backgroundColor: 'lightgrey', padding: 10, borderRadius: 8, marginTop: 10}}>{sitterData.about}</Text>

            <View style={{marginLeft: 5, width: wp('90%'), alignSelf: 'center', marginTop: 15}}>
              <Text style={{fontSize: hp('2.8%'), color:'black', fontWeight: 'bold', marginBottom: 5}}>Services Provided</Text>
              {
                sitterData.petPurposeType.map((eachItem, index) => {
                  return (
                    <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                      <AntDesign name="pushpin" size={20} color={'black'} style={{marginRight: 4}} />
                      <Text style={{fontSize: hp('2%'), color:'rgba(0,0,0,0.8)'}}> {eachItem}</Text>
                    </View>
                  )
                })
              }
            </View>

            <View style={{marginLeft: 5, width: wp('90%'), alignSelf: 'center', marginTop: 15}}>
              <Text style={{fontSize: hp('2.8%'), color:'black', fontWeight: 'bold', marginBottom: 5}}>Sizes this sitter can keep</Text>
              {
                sitterData.pet_size.map((eachItem, index) => {
                  return (
                    <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                      <AntDesign name="pushpin" size={20} color={'black'} style={{marginRight: 4}} />
                      <Text style={{fontSize: hp('2%'), color:'rgba(0,0,0,0.8)'}}> {eachItem}</Text>
                    </View>
                  )
                })
              }
            </View>

            <CustomButton 
              buttonText={'Send hire request'} 
              onPress={() => handleRequestSend(sitterData.petSitterId, petId)} 
            />
          </ScrollView>
        )
      }
    </FastImage>
  );
};

export default SitterDetails;

const styles = StyleSheet.create({
  HeadingText: {
    color: COLORS.black,
    fontSize: 15,
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
  header: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '600',
    color: COLORS.black,
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
});
