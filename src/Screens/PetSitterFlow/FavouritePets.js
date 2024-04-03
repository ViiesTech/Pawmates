import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BasUrl from '../../BasUrl';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {COLORS} from '../../Constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

const FavouritePets = ({navigation}) => {
  const {token} = useSelector(state => state.authData);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllFavourites = () => {
    let config = {
      method: 'get',
      url: `${BasUrl}/pet/allMy-favorite`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    axios
      .request(config)
      .then(response => {
        setLoading(false);
        if (response.data.success) {
          setFavourites(response.data.data);
        } else {
          Toast.show({
            type: 'error',
            text1: response.data.message,
          });
        }
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllFavourites();
    });
    return unsubscribe;
  }, [navigation]);

  console.log('1------->>  ', favourites[0]?.petDetail[0]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={75} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          marginVertical: 30,
        }}>
        <AntDesign
          name={'arrowleft'}
          size={25}
          color={'black'}
          onPress={() => navigation.goBack()}
          style={{paddingRight: 10}}
        />
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: hp('3.5%'),
            marginLeft: 25,
          }}>
          Favourites
        </Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}} >

      {favourites.length > 0 ? (
        favourites.map(eachPet => {
          return (
            <View
              style={{
                width: wp('90%'),
                backgroundColor: 'lightgrey',
                alignSelf: 'center',
                borderRadius: 8,
                overflow:'hidden',
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 8
              }}>
              <FastImage
                source={{
                  uri: `${BasUrl}/${eachPet?.petDetail[0]?.images[0]}`,
                }}
                style={{height: 80, width: 80, borderRadius: 8, backgroundColor: 'grey'}}
              />

              <View style={{marginLeft: 10}}>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp('3%'), marginBottom: 5}}>{eachPet?.petDetail[0]?.pet_nickname}</Text>
                <Text style={{color: 'black', fontSize: hp('1.8%')}}>{eachPet?.petDetail[0]?.pet_descp}</Text>
              </View>
            </View>
          );
        })
      ) : (
        <Text
          style={{
            color: 'black',
            fontSize: hp('2%'),
            alignSelf: 'center',
            marginTop: hp('5%'),
          }}>
          There are no favourites
        </Text>
      )}
      </ScrollView>
    </View>
  );
};

export default FavouritePets;

const styles = StyleSheet.create({});
