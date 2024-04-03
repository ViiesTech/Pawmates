import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import images from '../../Constants/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../Components/Button';
import { useSelector } from 'react-redux';
import BasUrl from '../../BasUrl';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const Gallery = ({navigation}) => {
  const {token} = useSelector(state => state.authData);
  const [galleryImages, setGalleryImages] = useState(null);

  const getAllGalleryImages = () => {
    let config = {
      method: 'get',
      url: `${BasUrl}/gallery/get`,
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    };
    
    axios.request(config)
    .then((response) => {
      if(response.data.success){
        setGalleryImages(response.data?.message)
      }else {
        Toast.show({
          type: 'error',
          text1: response.data.message
        })
      }
    })
    .catch((error) => {
      Toast.show({
        type: 'success',
        text1: error.message
      })
    });
  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllGalleryImages()
    })
    return unsubscribe;
  }, [navigation])
  
  
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 45}}>
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
            Gallery
          </Text>

          <CustomButton
            onPress={() => navigation.navigate('AddGalleryImages')}
            buttonText={'Add Images'}
            style={styles.buttonStyle}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: wp('90%'),
            alignSelf: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
            {
              galleryImages ? (
                galleryImages?.imagesGallery.map((eachImage, index) => {
                  return (
                    <Image
                      key={index}
                      source={{uri: `${BasUrl}/${eachImage}`}}
                      style={{
                        width: '48%',
                        height: hp('20%'),
                        borderRadius: 25,
                        objectFit: 'cover',
                        marginVertical: 8,
                      }}
                    />
                  )
                })
              ) : <Text style={{fontSize: hp('1.9%'), color: 'grey', marginTop: 20}}>There are currently no images in your gallery.</Text>
            }
        </View>
      </ScrollView>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '35%',
    marginTop: 0,
    padding: 10,
    // backgroundColor: 'black',
    height: 40,
    alignSelf: 'center',
    position: 'absolute',
    right: 0
  },
});
