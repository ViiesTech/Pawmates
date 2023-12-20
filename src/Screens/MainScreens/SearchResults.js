import {View, Text, StyleSheet, Alert, TouchableOpacity, FlatList, Image} from 'react-native';
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


const SearchResults = ({navigation, route}) => {
  const {token} = useSelector(state => state.authData);
  const [searchResults, setSearchResults] = useState([]);
  const {pet_category, pet_service, pet_id} = route.params;

  const fetchSitters = async () => {
    try {
      let myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      let raw = JSON.stringify({
        pet_category: pet_category,
        pet_service: pet_service,
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${BasUrl}/pet/check-api`, requestOptions)
        .then(response => response.text())
        .then(result => {
          const response = JSON.parse(result);
          if (response.success) {
            setSearchResults(response.data);
          } else {
            showToast('error', response.message);
          }
        })
        .catch(error => showToast('error', error.message));
    } catch (error) {
      showToast('error', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSitters();
    });

    return unsubscribe;
  }, [navigation]);

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  return (
    <FastImage source={images.BackGround} style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 25,
          width: wp('92%'),
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
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: 25}]}>
          Search Results
        </Text>
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('SitterDetails', {sitterData: item, petId: pet_id})}
              activeOpacity={0.6}
              style={{
                width: wp('92%'),
                height: hp('17%'),
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                marginVertical: 10,
                padding: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                flexDirection: 'row'
              }}>
                <Image source={{uri: `${BasUrl}/${item.images[0]}`}} style={{width: '25%', height: '100%', backgroundColor:'lightgrey', borderRadius: 6}} />
                <View style={{width: '40%', marginLeft: 10}}>
                  <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black'}}>{item.name} . {item.age}</Text>
                  <Text style={{fontSize: hp('1.6%'), marginTop: 3, color:'grey'}}>{item.about.length > 50 ? `${item.about.slice(0, 50)}...` : item.about}</Text>
                </View>
                <View style={{marginLeft: 5}}>
                  <Text style={{fontSize: hp('1.5%'), color:'black', fontWeight: 'bold', marginBottom: 5}}>Services Provided</Text>
                  {
                    item.petPurposeType.map((eachItem, index) => {
                      return (
                        <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                          <AntDesign name="pushpin" size={12} color={'black'} style={{marginRight: 4}} />
                          <Text style={{fontSize: hp('1.4%'), color:'rgba(0,0,0,0.8)'}}>{eachItem}</Text>
                        </View>
                      )
                    })
                  }
                </View>
            </TouchableOpacity>
          );
        }}
      />
    </FastImage>
  );
};

export default SearchResults;

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
