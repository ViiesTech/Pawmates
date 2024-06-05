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
import InputField from '../../Components/InputField';
import CustomButton from '../../Components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { ActivityIndicator } from 'react-native-paper';

const SearchResults = ({navigation, route}) => {
  const {token} = useSelector(state => state.authData);
  const {myPets} = route.params;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // dropdown for services 
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState(null);
  const [items, setItems] = useState([
    {label: 'Boarding', value: 'boarding'},
    {label: 'House Sitting', value: 'house sitting'},
    {label: 'Drop In Visit', value: 'drop in visit'},
    {label: 'Pet Day Care', value: 'pet day care'},
    {label: 'Pet Walking', value: 'pet walking'},
  ]);

  // dropdown for pet category
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [petCategory, setPetCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
    {label: 'Farm Animals', value: 'animals'},
    {label: 'Reptiles', value: 'reptiles'},
    {label: 'Birds', value: 'birds'},
    {label: 'Domesticated Animals', value: 'domesticated animals'},
    {label: 'Exotic Animals', value: 'exotic animals'},
  ]);

  const fetchSitters = async () => {
    try {
      let myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      let raw = JSON.stringify({
        pet_category: petCategory,
        pet_service: services,
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      setLoading(true)
      fetch(`${BasUrl}/pet/check-api`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setLoading(false)
          const response = JSON.parse(result);
          if (response.success) {
            setSearchResults(response.data);
          } else {
            showToast('error', response.message);
          }
        })
        .catch(error => {
          console.log(error)
          setLoading(true)
        });
    } catch (error) {
      showToast('error', error.message);
    }
  };

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  return (
    <FastImage source={images.BackGround} style={{flex: 1}}>
      <View
        style={styles.headerCont}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{
            padding: 8,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 5,
          }}>
        <AntDesign
          name="arrowleft"
          size={25}
          color={'black'}
        />
        </TouchableOpacity>
        <Text style={[styles.HeadingText, {fontWeight: 'bold', fontSize: 25}]}>
          Search Sitters
        </Text>
      </View>

      <View style={{width: wp('90%'), alignSelf: 'center', zIndex: 2}}>
        <DropDownPicker
          style={{marginTop: 5, borderColor: 'black', color: 'grey', paddingHorizontal: 20, width: wp('90%'), alignSelf: 'center', backgroundColor: 'transparent'}}
          placeholder="Service you want"
          placeholderStyle={{color: 'rgba(0,0,0,0.5)'}}
          open={open}
          value={services}
          items={items}
          setOpen={setOpen}
          setValue={setServices}
          setItems={setItems}
          dropDownContainerStyle={{width: wp('90%'), alignSelf: 'center'}}
          zIndex={3}
        />
        <DropDownPicker
          style={{marginTop: 5, borderColor: 'black', position:'relative', color: 'grey', paddingHorizontal: 20, width: wp('90%'), alignSelf: 'center', backgroundColor: 'transparent'}}
          placeholder="Pet Category"
          placeholderStyle={{color: 'rgba(0,0,0,0.5)'}}
          open={categoryOpen}
          value={petCategory}
          items={categoryItems}
          setOpen={setCategoryOpen}
          setValue={setPetCategory}
          setItems={setCategoryItems}
          dropDownContainerStyle={{width: wp('90%'), alignSelf: 'center' }}
          zIndex={2}
        />
        <CustomButton onPress={fetchSitters} buttonText={loading ? <ActivityIndicator color='white' size={25} /> :'Search'} style={{marginTop: 8, width: wp('90')}} />
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={item => item._id}
        style={{zIndex: 1, marginTop: 8}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('SitterDetails', {sitterData: item, myPets})}
              activeOpacity={0.6}
              style={styles.sitterInfoCont}>
                <Image source={{uri: `${BasUrl}/${item.images[0]}`}} style={{width: '25%', height: '100%', backgroundColor:'lightgrey', borderRadius: 6}} />
                <View style={{width: '40%', marginLeft: 10}}>
                  <Text style={{fontSize: hp('2.2%'), fontWeight: 'bold', color: 'black'}}>{item.name} . {item.age}</Text>
                  <Text style={{fontSize: hp('1.6%'), marginTop: 3, color:'grey'}}>{item.about.length > 50 ? `${item.about.slice(0, 50)}...` : item.about}</Text>
                </View>
                <View style={{marginLeft: 5}}>
                  <Text style={{fontSize: hp('1.5%'), width: '85%', color:'black', fontWeight: 'bold', marginBottom: 5}}>Services Provided</Text>
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
        ListEmptyComponent={() => {
          return (
            <Text style={{color: 'rgba(0,0,0,0.7)', alignSelf: 'center', fontSize: hp('2%'), marginTop: hp('4%')}}>No sitters found</Text>
          )
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
  headerCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
    width: wp('92%'),
    alignSelf: 'center'
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
  sitterInfoCont: {
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
