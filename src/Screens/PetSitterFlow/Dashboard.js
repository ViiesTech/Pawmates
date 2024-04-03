import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../Constants/theme';
import CustomButton from '../../Components/Button';
import images from '../../Constants/images';
import BasUrl from '../../BasUrl';
import axios from 'axios';

const Dashboard = ({navigation}) => {
  const {user, token} = useSelector(state => state.authData);
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
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flexDirection:'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginVertical: 30}}>
          <AntDesign name={'arrowleft'} size={25} color={'black'} onPress={() => navigation.goBack()} style={{paddingRight: 10}} />
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp('3.5%'), marginLeft: 25}}>Dashboard</Text>
        </View>

        <View activeOpacity={0.6} style={{width: wp('90%'), overflow: 'hidden', height: hp('15%'), backgroundColor: 'lightgrey', alignSelf: 'center', borderRadius: 18}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp('2.5%'), margin: 26, zIndex:6}}>Hi, {user.name}</Text>
          <Image
            source={{uri: `${BasUrl}/${user.profileImage}`}}
            style={{width: '100%', height: '100%', position: 'absolute', zIndex: -1}}
          />
          <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: 5, backgroundColor: 'rgba(255, 255, 255, 0.4)'}} />

          <View style={{flexDirection:'row', alignItems: 'center', position: 'absolute', bottom: 18, right: 18, zIndex: 6 }}>
            <Feather onPress={() => navigation.navigate('Profile')} name='eye' color={'black'} size={20} style={{backgroundColor: 'white', padding: 10, borderRadius: 250, marginRight: 10}} />
            {/* <Feather onPress={() => navigation.navigate('EditProfile')} name='edit-2' color={'black'} size={20} style={{backgroundColor: 'white', padding: 10, borderRadius: 250,}} /> */}
          </View>
        </View>
        
        <View style={{width: wp('90%'), backgroundColor: COLORS.secondary_with_opacity, alignSelf: 'center', borderRadius: 18, marginTop: 20}}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: hp('2.8%'), marginLeft: 26, marginTop: 20}}>Wallet</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 10, width: '60%', justifyContent:'space-between'}}>
            <Text style={{color: 'white', fontSize: hp('2.8%'),}}>Your earnings</Text>
            <Text style={{color: 'white', fontSize: hp('2.8%'),}}>$25</Text>
          </View>

          <CustomButton buttonText={'Manage Wallet'} style={{backgroundColor: 'white', marginTop: 15, marginBottom: 15}} textStyle={{color: 'black'}} />
        </View>

        {galleryImages ? (

        <View style={{width: wp('90%'), backgroundColor: COLORS.primary_with_opacity, alignSelf: 'center', borderRadius: 18, marginTop: 20}}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: hp('2.8%'), marginLeft: 26, marginTop: 20}}>Your Gallery</Text>

          <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-around', marginTop: 15}}>
            {
              galleryImages?.imagesGallery.map((eachImage, index) => {
                if(index < 4){
                  return (
                    <Image source={{uri: `${BasUrl}/${eachImage}`}} key={index} style={{width: 75, height: 75, objectFit: 'cover', borderRadius: 10, margin: 5}} />
                  )
                }
              })
            }
          </View>

          <CustomButton buttonText={'See all images'} onPress={() => navigation.navigate('Gallery')} style={{backgroundColor: 'white', marginTop: 15, marginBottom: 15}} textStyle={{color: 'black'}} />
        </View>
        ) : null}
      </ScrollView>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})