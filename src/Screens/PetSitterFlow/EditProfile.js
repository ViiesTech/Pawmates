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
import CustomText from '../../Components/Text';
import ImageCropPicker from 'react-native-image-crop-picker';

const EditProfile = ({navigation, route}) => {
  const {user, token} = useSelector(state => state.authData);
  const {completeUserInfo} = route.params;

  const [username, setUsername] = useState(user.name);
  const [about, setAbout] = useState(completeUserInfo?.about);
  const [gender, setGender] = useState(completeUserInfo?.gender);
  const [age, setAge] = useState(completeUserInfo?.age);
  const [animalType, setAnimalType] = useState(completeUserInfo?.categoryName);
  const [petSizes, setPetSizes] = useState(completeUserInfo?.pet_size);
  const [services, setServices] = useState(completeUserInfo?.petPurposeType);
  const [pickedImage, setPickedImage] = useState({});


  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        setPickedImage(image);
      })
      .catch(err => {
        console.log(
          'Some error message occurred with picking images--->>   ',
          err,
        );
      });
  };

  const selectService = tappedService => {
    if (services?.includes(tappedService)) {
      const filteredServices = services.filter(
        eachService => eachService !== tappedService,
      );
      setServices(filteredServices);
    } else {
      setServices([...services, tappedService]);
    }
  };
  const selectAnimal = tappedAnimalType => {
    if (animalType?.includes(tappedAnimalType)) {
      const filteredAnimal = animalType.filter(
        eachAnimal => eachAnimal !== tappedAnimalType,
      );
      setAnimalType(filteredAnimal);
    } else {
      setAnimalType([...animalType, tappedAnimalType]);
    }
  };
  const selectPetSize = tappedSize => {
    if (petSizes?.includes(tappedSize)) {
      const filteredSizes = petSizes.filter(
        eachSize => eachSize !== tappedSize,
      );
      setPetSizes(filteredSizes);
    } else {
      setPetSizes([...petSizes, tappedSize]);
    }
  };

  const Data = [
    {
      id: 1,
      image: images.BOARDING,
      title: 'BOARDING',
      service: 'boarding',
    },
    {
      id: 2,
      image: images.HOUSESITTING,
      title: 'HOUSE SITTING',
      service: 'house sitting',
    },
    {
      id: 3,
      image: images.DROPINVISIT,
      title: 'DROP IN VISIT',
      service: 'drop in visit',
    },
    {
      id: 4,
      image: images.PETDAYCARE,
      title: 'PET DAY CARE',
      service: 'pet day care',
    },
    {
      id: 5,
      image: images.PETWALKING,
      title: 'PET WALKING',
      service: 'pet walking',
    },
  ];
  const animals = [
    {
      label: 'Farm Animals',
      value: 'animals',
    },
    {
      label: 'Reptiles',
      value: 'reptiles',
    },
    {
      label: 'Birds',
      value: 'birds',
    },
    {
      label: 'Domesticated Animals',
      value: 'domesticated animals',
    },
    {
      label: 'Exotic Animals',
      value: 'exotic animals',
    },
  ];
  const petSizesData = [
    {
      id: 1,
      title: 'Small',
      size: '0-15 lbs',
      value: 'small',
    },
    {
      id: 2,
      title: 'Medium',
      size: '16-40 lbs',
      value: 'medium',
    },
    {
      id: 3,
      title: 'Large',
      size: '41-100 lbs',
      value: 'large',
    },
    {
      id: 4,
      title: 'Giant',
      size: '101+ lbs',
      value: 'giant',
    },
  ];

  const updateProfileInfo = () => {
    let data = new FormData();
    data.append('gender', gender);
    data.append('petPurposeType', JSON.stringify(services));
    data.append('categoryName', JSON.stringify(animalType));
    data.append('age', age);
    data.append('about', about);
    data.append('latitude', '1.3521');
    data.append('longitude', '103.8198');
    data.append('pet_size', JSON.stringify(petSizes));
    data.append('name', username);
    Object.values(pickedImage).length > 0
      ? data.append('updateProfileImage', {
          name: 'image',
          type: pickedImage.mime,
          uri: pickedImage.path,
        })
      : null;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BasUrl}/user/profile-update`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        if(response.data.success){
          navigation.navigate('Home')
          Toast.show({
            type: 'success',
            text1: 'Profile update successfully'
          })
        }else {
          console.log(response.data.message)
          Toast.show({
            type: 'error',
            text1: `${response.data.message}`
          })

        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: `${error.message}`
        })
      });
  };

  if (Object.values(completeUserInfo).length <= 0) {
    return <ActivityIndicator size={50} color={'black'} />;
  }

  return (
    <FastImage source={images.BackGround} style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
            style={{paddingRight: 5}}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </TouchableOpacity>
          <CustomButton
            onPress={updateProfileInfo}
            buttonText={'Save'}
            style={styles.buttonStyle}
          />
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.profileImageCont}>
          {user?.profileImage ? (
            <Image
              source={{uri: pickedImage?.path ? pickedImage.path : `${BasUrl}/${user.profileImage}`}}
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <Ionicons name={'person'} size={40} color={'gray'} />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="username"
          style={[
            styles.HeadingText,
            {
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: 20,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              borderRadius: 10,
              color: 'black',
            },
          ]}
          value={username}
          onChangeText={changedText => setUsername(changedText)}
        />

        <View
          style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('2%')}}>
          <Text
            style={[
              styles.HeadingText,
              {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20},
            ]}>
            About
          </Text>
          {/* <Text style={{color: COLORS.black, fontSize: hp('1.7%')}}>{completeUserInfo.about}</Text> */}
          <TextInput
            placeholder="username"
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              borderRadius: 10,
              color: 'black',
            }}
            value={about}
            onChangeText={changedText => setAbout(changedText)}
          />
        </View>

        <View
          style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('1%')}}>
          <Text
            style={[
              styles.HeadingText,
              {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20},
            ]}>
            Gender
          </Text>
          {/* <Text style={{color: COLORS.black, fontSize: hp('1.7%')}}>{completeUserInfo.gender}</Text> */}
          <TextInput
            placeholder="username"
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              borderRadius: 10,
              color: 'black',
            }}
            value={gender}
            onChangeText={changedText => setGender(changedText)}
          />
        </View>

        <View
          style={{width: wp('86%'), alignSelf: 'center', marginTop: hp('1%')}}>
          <Text
            style={[
              styles.HeadingText,
              {fontWeight: 'bold', fontSize: hp('2.2%'), marginTop: 20},
            ]}>
            Age
          </Text>
          {/* <Text style={{color: COLORS.black, fontSize: hp('1.7%')}}>{completeUserInfo.age}</Text> */}
          <TextInput
            placeholder="username"
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              borderRadius: 10,
              color: 'black',
            }}
            value={age}
            onChangeText={changedText => setAge(changedText)}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.container}>
          <Text
            style={[
              styles.HeadingText,
              {
                fontWeight: 'bold',
                fontSize: hp('2.2%'),
                marginBottom: 20,
                width: '93%',
                alignSelf: 'center',
              },
            ]}>
            Services you provide
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={Data}
            renderItem={({item}) => {
              return (
                <View style={styles.flatlist_container}>
                  <TouchableOpacity
                    onPress={() => selectService(item.service)}
                    style={[
                      styles.Data_View,
                      services?.includes(item.service) ? styles.selected : null,
                    ]}>
                    <Image source={item.image} />
                    <CustomText
                      text={item.title}
                      style={{marginHorizontal: 6, fontSize: 13}}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <View style={{height: 30}} />
        </View>

        <View style={styles.container}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              width: '93%',
              alignSelf: 'center',
              color: 'black',
              marginBottom: 30,
            }}>
            What kind of pets you can take care of?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            {animals.map((eachAnimal, index) => {
              return (
                <TouchableOpacity
                  onPress={() => selectAnimal(eachAnimal.value)}
                  key={index}
                  style={[
                    styles.animalTypeStyle,
                    animalType?.includes(eachAnimal.value)
                      ? {borderColor: COLORS.primary}
                      : null,
                  ]}>
                  <Text
                    style={[
                      styles.HeadingText,
                      {
                        alignSelf: 'flex-start',
                        marginLeft: 10,
                        fontSize: hp('1.9%'),
                      },
                    ]}>
                    {eachAnimal.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.container}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2.2%'),
              width: '93%',
              alignSelf: 'center',
              color: 'black',
              marginBottom: 30,
            }}>
            What pet size you would prefer?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            {petSizesData.map((eachSize, index) => {
              return (
                <TouchableOpacity
                  onPress={() => selectPetSize(eachSize.value)}
                  key={index}
                  style={[
                    styles.eachSizeStyle,
                    petSizes?.includes(eachSize.value)
                      ? {borderColor: COLORS.primary}
                      : null,
                  ]}>
                  <Text style={[styles.HeadingText, {marginBottom: 0}]}>
                    {eachSize.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: hp('1.8%'),
                      color: 'grey',
                      marginTop: 5,
                      textAlign: 'center',
                    }}>
                    {eachSize.size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </FastImage>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  HeadingText: {
    color: COLORS.black,
    fontSize: 20,
  },
  container: {
    backgroundColor: COLORS.text_white,
    width: '88%',
    paddingHorizontal: 15,
    borderRadius: 20,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 20,
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
  },
  flatlist_container: {
    flex: 1,
  },
  Data_View: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderColor: 'rgba(112, 112, 112,100)',
    width: '90%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  selected: {borderColor: COLORS.primary, borderWidth: 3},
  animalTypeStyle: {
    width: '45%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 3,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginVertical: 7,
  },
  eachSizeStyle: {
    width: '45%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
    borderWidth: 3,
    borderColor: 'lightgrey',
    borderRadius: 8,
    margin: 5,
  },
  btnContainer: {
    height: 60,
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: COLORS.secondary_with_opacity,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    marginTop: 20,
  },
});
