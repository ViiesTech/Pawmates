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
  } from 'react-native';
  import React, {useState} from 'react';
  import FastImage from 'react-native-fast-image';
  import images from '../../Constants/images';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import {COLORS} from '../../Constants/theme';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import ImagePicker from 'react-native-image-crop-picker';
  import BackButton from '../../Components/BackButton';
  import BasUrl from '../../BasUrl';
  import { useSelector } from 'react-redux';
  import axios from 'axios';
  import LoaderModal from '../../Components/LoaderModal';
  import Toast from 'react-native-toast-message';
  import { useDispatch } from 'react-redux';
  import { updateSitterStatus } from '../../Redux/authSlice';
  
  const AddGalleryImages = ({navigation, route}) => {
    const dispatch = useDispatch();
  
    const {token} = useSelector(state => state.authData)
    const [pickedImages, setPickedImages] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const pickImage = () => {
      ImagePicker.openPicker({
        multiple: true,
        width: 300,
        height: 400,
        mediaType: 'photo',
        cropping: true,
      })
        .then(image => {
          setPickedImages([...pickedImages, ...image]);
        })
        .catch(err => {
          console.log('Some error message occurred with picking images');
        });
    };
    const onRemovePress = path => {
      const filteredImages = pickedImages.filter(eachImg => {
        return eachImg.path !== path;
      });
      setPickedImages(filteredImages);
    };
  
     
  const uploadGalleryImages = () => {
    let data = new FormData();
    pickedImages.length > 0 ? data.append('imagesGallery', {
      name: 'image',
      type: pickedImages[0].mime,
      uri: pickedImages[0].path
    }) : null
    pickedImages.length > 1 ? data.append('imagesGallery', {
        name: 'image',
        type: pickedImages[1].mime,
        uri: pickedImages[1].path
    }) : null
    pickedImages.length > 2 ? data.append('imagesGallery', {
        name: 'image',
        type: pickedImages[2].mime,
        uri: pickedImages[2].path
    }) : null
    pickedImages.length > 3 ? data.append('imagesGallery', {
        name: 'image',
        type: pickedImages[3].mime,
        uri: pickedImages[3].path
    }) : null
    pickedImages.length > 4 ? data.append('imagesGallery', {
        name: 'image',
        type: pickedImages[4].mime,
        uri: pickedImages[4].path
    }) : null

    let config = {
      method: 'post',
      url: `${BasUrl}/gallery/post`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      data: data,
    };

    setLoading(true)
    if(pickedImages.length > 4){
      axios
        .request(config)
        .then(response => {
          setLoading(false)
          if(response.data.success){
              setPickedImages([])
              navigation.navigate('Gallery')
              showToast('success', "Your data has been registered 😃")
          }else {
              showToast('error', response.data.message)
          }
        })
        .catch(error => {
          setLoading(false)
          showToast('error', error.message)
        });
    }else {
      setLoading(false)
      showToast('error', 'Please select atleast five picture 🙂')
    }
  };

    const showToast = (type, text) => {
      Toast.show({
        type: type,
        text1: text
      })
    }
  
    if(loading){
      return <LoaderModal />
    }
  
    return (
      <FastImage
        source={images.BackGround}
        style={{flex: 1, justifyContent: 'center', padding: 20}}>
        <BackButton
          onPressBack={() => navigation.navigate('Gallery')}
          style={{position: 'absolute', top: 10, left: 6}}
        />
        <Text style={[styles.HeadingText, {fontWeight: 'bold'}]}>
          Add gallery images
        </Text>
        <Text style={{color: COLORS.black, width: wp('70%'), marginTop: 8}}>
          You can pick upto five images.
        </Text>
  
        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: wp('92%'), alignSelf:'center'}}>
          {pickedImages.map((eachImg, index) => {
            if(index < 5){
              return (
                <View key={index} style={styles.imageStyling}>
                  <Image
                    source={{uri: eachImg.path}}
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                  />
                  <TouchableOpacity
                    style={styles.crossIcon}
                    onPress={() => onRemovePress(eachImg.path)}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>x</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
          {pickedImages.length < 5 ? (
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.placeholderCont}>
              <FontAwesome name={'photo'} size={30} color={'gray'} />
              <View style={styles.plusIcon}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
  
  
        <TouchableOpacity
          onPress={uploadGalleryImages}
          style={{
            height: 60,
            width: wp('90%'),
            alignSelf: 'center',
            backgroundColor: COLORS.secondary_with_opacity,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 200,
            marginTop: 70,
          }}>
          <Text style={{color: COLORS.text_white}}>Continue</Text>
        </TouchableOpacity>
      </FastImage>
    );
  };
  
  export default AddGalleryImages;
  
  const styles = StyleSheet.create({
    HeadingText: {
      color: COLORS.black,
      fontSize: 30,
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
    plusIcon: {
      height: 30,
      width: 30,
      backgroundColor: COLORS.secondary_with_opacity,
      borderRadius: 200,
      position: 'absolute',
      zIndex: 10,
      bottom: -10,
      right: -10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    crossIcon: {
      height: 30,
      width: 30,
      backgroundColor: COLORS.secondary_with_opacity,
      borderRadius: 200,
      position: 'absolute',
      zIndex: 10,
      top: -10,
      right: -10,
      alignItems: 'center',
    },
    imageStyling: {
      height: hp('20%'),
      width: '31%',
      backgroundColor: 'white',
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'lightgrey',
      marginRight: '2%'
    },
    placeholderCont: {
      height: hp('20%'),
      width: '31%',
      backgroundColor: 'white',
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'lightgrey',
    },
  });
  