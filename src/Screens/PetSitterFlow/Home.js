import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import CustomText from '../../Components/Text';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../Constants/theme';
import {useDispatch} from 'react-redux';
import {logOut} from '../../Redux/authSlice';
import * as Animatable from 'react-native-animatable';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import BasUrl from '../../BasUrl';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {token, user} = useSelector(state => state.authData);
  const [allPets, setAllPets] = useState();
  const cardRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const Data = [
    {
      id: 1,
      image: images.cat1,
    },
    {
      id: 2,
      image: images.cat2,
    },
    {
      id: 3,
      image: images.cat3,
    },
    {
      id: 4,
      image: images.cat4,
    },
  ];

  const getAllPets = () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BasUrl}/pet/getall-pet`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.success) {
          setAllPets(response.data.data);
        } else {
          showToast('error', response.data.message);
        }
      })
      .catch(error => {
        showToast('error', error.message);
      });
  };

  
  const sendPetRequest = (petId, petOwnnerId) => {
    let data = JSON.stringify({
      "pet_id": petId,
      "pet_owner_id": petOwnnerId,
      "pet_request_send": "send",
      "check_userrr_id": user.id
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BasUrl}/pet/req-send`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.data)
      if(response.data.success){
        showToast('success', 'Your request for the pet sitting has been sent 😊')
        cardRef.current.fadeOutDown(500).then(() => {
            setCurrentCardIndex(
              prevIndex => (prevIndex + 1) % allPets.length,
            );
            cardRef.current.fadeInUp(500);
        });
      }else {
        showToast('error', response.data.message)
      }
    })
    .catch((error) => {

      showToast('error', error.message)
    });
  }

  const removePetFromStack = () => {
    // Fade out the current card
    cardRef.current.fadeOutDown(500).then(() => {
      // Increment the index to show the next card
      setCurrentCardIndex(
        prevIndex => (prevIndex + 1) % allPets.length,
      );
      // Fade in the next card
      cardRef.current.fadeInUp(500);
    });
  }

  useEffect(() => {
    getAllPets();
  }, []);

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  return (
    <FastImage source={images.BackGround} style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Log out', 'Are you sure, you want to log out?', [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'Yes', onPress: () => dispatch(logOut())},
                ]);
              }}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: COLORS.secondary_with_opacity,
                borderRadius: 10,
                padding: 10,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Log out
              </Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationScreenn')}>
                <FontAwesome name={'bell'} size={30} color={COLORS.black} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Chats')}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  padding: 10,
                  marginLeft: 10,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Chats
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {allPets?.length > 0 ? (
            <Animatable.View
              ref={cardRef}
              animation="fadeInUp"
              iterationCount={1}
              direction="alternate">
              <FastImage
                source={{uri: `${BasUrl}/${allPets[currentCardIndex]?.images[0]}`}}
                style={{
                  height: hp('50%'),
                  width: wp('90%'),
                  borderRadius: 15,
                  backgroundColor:'lightgrey'
                }}
                resizeMode="cover">
                <View style={{height: '64%'}} />
                <View style={styles.avatarContainer}>
                  <CustomText
                    text={`${allPets[currentCardIndex]?.pet_nickname} . ${allPets[currentCardIndex]?.age}`}
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: hp('2.3%'),
                      marginLeft: 3,
                    }}
                  />
                  <View style={styles.innerContainer}>
                    <Feather
                      name={'map-pin'}
                      size={20}
                      color={COLORS.text_white}
                    />
                    <CustomText
                      text={'  New York  .  25 Km'}
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: hp('2%'),
                      }}
                    />
                  </View>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={removePetFromStack} style={styles.iconsInnerConatiner}>
                      <Fontisto
                        name={'close-a'}
                        size={20}
                        color={COLORS.text_white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconsInnerConatiner}>
                      <Entypo
                        name={'star'}
                        size={30}
                        color={COLORS.text_white}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconsInnerConatiner}
                      onPress={() => {
                          sendPetRequest(allPets[currentCardIndex]?._id, allPets[currentCardIndex]?.pet_owner_id)
                      }}>
                      <Ionicons
                        name={'checkmark-sharp'}
                        size={30}
                        color={COLORS.text_white}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </FastImage>

              <View
                style={{width: wp('85%'), alignSelf: 'center', marginTop: 15}}>
                <CustomText
                  text={'About'}
                  style={{
                    fontSize: hp('2%'),
                    fontWeight: 'bold',
                    marginBottom: 5,
                  }}
                />
                <CustomText
                  style={{fontSize: hp('1.8%')}}
                  text={allPets[currentCardIndex]?.pet_descp ? allPets[currentCardIndex]?.pet_descp : 'This is the about info of the pet'}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: wp('90%'),
                  height: hp('20%'),
                  alignSelf: 'center',
                  justifyContent: 'space-around',
                  marginTop: 20,
                }}>
                <Image
                  source={{
                    uri: `${BasUrl}/${allPets[currentCardIndex]?.images[1]}`,
                  }}
                  style={{
                    width: '47%',
                    height: '95%',
                    objectFit: 'cover',
                    borderRadius: 16,
                    backgroundColor: 'lightgrey'
                  }}
                />
                <Image
                  source={{
                    uri: `${BasUrl}/${allPets[currentCardIndex]?.images[2]}`,
                  }}
                  style={{
                    width: '47%',
                    height: '95%',
                    objectFit: 'cover',
                    borderRadius: 16,
                    backgroundColor: 'lightgrey'
                  }}
                />
              </View>
            </Animatable.View>
          ) : (
            <Text>Not Found</Text>
          )}
        </View>
      </ScrollView>
    </FastImage>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  avatarContainer: {
    marginHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
    borderRadius: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  iconsInnerConatiner: {
    height: 45,
    width: 45,
    backgroundColor: '#F8A756',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    padding: 10,
    justifyContent: 'space-between',
  },
});
