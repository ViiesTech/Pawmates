import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
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
import {useSelector} from 'react-redux';
import axios from 'axios';
import BasUrl from '../../BasUrl';
import Toast from 'react-native-toast-message';

const Notifications = ({navigation}) => {
  const {token, user} = useSelector(state => state.authData);
  const [allRequests, setAllRequests] = useState([]);

  const fetchAllRequests = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BasUrl}/pet/reqinfo-petowner`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        console.log(response.data.data);
        if (response.data.success) {
          setAllRequests(response.data.data);
        } else {
          showToast('error', response.data.message);
        }
      })
      .catch(error => {
        showToast('error', error.message);
      });
  };

  const acceptRequest = petRequestId => {
    let data = JSON.stringify({
      petrequest_id: petRequestId,
      pet_owner_accept_status: 'accept',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BasUrl}/pet/req-accept-status`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.success) {
          fetchAllRequests();
          showToast(
            'success',
            'You have successfully accepted the request of this pet sitter',
          );
        } else {
          showToast('error', response.data.message);
        }
      })
      .catch(error => {
        showToast('error', error.message);
      });
  };

  const rejectRequest = petRequestId => {
    let data = JSON.stringify({
      petrequest_id: petRequestId,
      pet_owner_accept_status: 'reject',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BasUrl}/pet/req-accept-status`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.success) {
          fetchAllRequests();
        } else {
          showToast('error', response.data.message);
        }
      })
      .catch(error => {
        showToast('error', error.message);
      });
  };

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAllRequests();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <FastImage
      source={images.BackGround}
      style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20,
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
          Your Requests
        </Text>
      </View>

      <FlatList
        data={allRequests}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          if (item?.pet_owner_accept_status === 'pending') {
            return (
              <View
                style={{
                  height: 120,
                  width: wp('90%'),
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  {item?.senderid_images?.length > 0 ? (
                    <Image
                      source={{
                        uri: `${BasUrl}/${item?.senderid_images[0]}`,
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 4,
                        backgroundColor: 'grey',
                      }}
                    />
                  ) : (
                    <FontAwesome name={'photo'} size={50} color={'gray'} />
                  )}
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={[
                        styles.HeadingText,
                        {fontWeight: 'bold'},
                      ]}>{`${item?.senderid_name}, ${item?.senderid_age}`}</Text>
                    <Text style={[styles.HeadingText]}>
                      55 km, Art. Director
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => acceptRequest(item?._id)}
                    style={{
                      height: 40,
                      width: 100,
                      backgroundColor: COLORS.secondary_with_opacity,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white'}}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => rejectRequest(item?._id)}
                    style={{
                      height: 40,
                      width: 100,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: 'red',
                      marginTop: 5,
                    }}>
                    <Text style={{color: 'black'}}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          } else if (item?.pet_owner_accept_status === 'accept') {
            return (
              <View
                style={{
                  height: 120,
                  width: wp('90%'),
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.acceptTag}>ACCEPTED REQUEST</Text>
                <View style={{flexDirection: 'row'}}>
                  {item?.senderid_images?.length > 0 ? (
                    <Image
                      source={{
                        uri: `${BasUrl}/${item?.senderid_images[0]}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 4,
                        backgroundColor: 'grey',
                      }}
                    />
                  ) : (
                    <FontAwesome name={'photo'} size={50} color={'gray'} />
                  )}
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={[
                        styles.HeadingText,
                        {fontWeight: 'bold'},
                      ]}>{`${item?.senderid_name}, ${item?.senderid_age}`}</Text>
                    <Text style={[styles.HeadingText]}>
                      55 km, Art. Director
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChatScreen', {
                      otherUserId: item.pet_request_senderid,
                      requestAccepted: true,
                      userData: {
                        user_name: item.senderid_name,
                        image_uri: `${BasUrl}/${item?.pet_images[0]}`,
                      },
                    })
                  }
                  style={{
                    height: 40,
                    width: 100,
                    borderRadius: 10,
                    alignItems: 'center',
                    backgroundColor: COLORS.secondary_with_opacity,
                    justifyContent: 'center',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Chat
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
    </FastImage>
  );
};

export default Notifications;

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
  acceptTag: {
    position: 'absolute',
    top: 5,
    left: 10,
    backgroundColor: 'green',
    fontSize: hp('1.3%'),
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
});
