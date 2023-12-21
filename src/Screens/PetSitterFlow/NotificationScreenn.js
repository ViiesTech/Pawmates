import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../Constants/theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import axios, { all } from 'axios';
import BasUrl from '../../BasUrl';
import Toast from 'react-native-toast-message';

const NotificationScreen = ({navigation}) => {
    const {token} = useSelector(state => state.authData);
    const [allRequests, setAllRequests] = useState([])

    const fetchAllRequests = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BasUrl}/pet/reqinfo-petsitter`,
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        };

        axios.request(config)
        .then((response) => {
            if(response.data.success){
                setAllRequests(response.data.data)
            }else {
                showToast('error', response.data.message)
            }
        })
        .catch((error) => {
            showToast('error', error.message)
        });
    }


    const acceptRequest = (petRequestId) => {
        let data = JSON.stringify({
            petownerrequest_id: petRequestId,
            pet_sitter_accept_status: "accept"
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BasUrl}/pet/sitter-req-accept-status`,
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            if(response.data.success){
                fetchAllRequests()
                showToast('success', 'You have been successfully hired by this pet owner')
            }else {
                showToast('error', response.data.message)
            }
          })
          .catch((error) => {
            showToast('error', error.message)
        });
    }

    const rejectRequest = (petRequestId) => {
        let data = JSON.stringify({
            petownerrequest_id: petRequestId,
            pet_sitter_accept_status: "reject"
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BasUrl}/pet/sitter-req-accept-status`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            data : data
          };
          
          axios.request(config)
          .then((response) => {
            if(response.data.success){
                fetchAllRequests()
            }else {
                showToast('error', response.data.message)
            }
          })
          .catch((error) => {
            showToast('error', error.message)
        });
    }

    const showToast = (type, msg) => {
        Toast.show({
          type: type,
          text1: msg,
        });
    };
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAllRequests()
        })

        return unsubscribe;
    }, [navigation])

    return (
        <FastImage source={images.BackGround} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginVertical: 20}}>
                <AntDesign name="arrowleft" size={25} color={'black'} onPress={() => navigation.goBack()} style={{padding: 8, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 250}} />
                <Text style={[styles.HeadingText, { fontWeight: 'bold', fontSize: 25, width: '50%', textAlign: 'right' }]}>Hire Requests by pet owners</Text>
            </View>

            <FlatList
                data={allRequests}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    console.log("@@@@@@@@@->>   ", item.pet_images[0])
                    if(item?.pet_sitter_accept_status === 'pending'){
                        return (
                            <View style={{ width: wp('90%'), backgroundColor: "white", borderRadius: 10, marginTop: 10, paddingVertical: 10 }}>
                                <View style={{width: wp('88%'), marginVertical: 10, backgroundColor: "white", borderRadius: 10, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingHorizontal: 10, justifyContent: 'space-between' }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        {
                                            item?.pet_images?.length > 0 ? (
                                                <Image source={{uri: `${BasUrl}/${item?.pet_images[0]}`}} style={{width: 60, height: 60, borderRadius: 4, backgroundColor: 'grey'}} />
                                            ) : (
                                                <FontAwesome
                                                    name={"photo"}
                                                    size={50}
                                                    color={'gray'}
                                                />
                                            )
                                        }
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={[styles.HeadingText, { fontWeight: 'bold' }]}>{`${item?.pet_nickname}, ${item?.pet_age}`}</Text>
                                            <Text style={[styles.HeadingText,]}>55 km, Art. Director</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{width: '92%', alignSelf: 'center', marginVertical: 5}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{color: 'black', fontSize: hp('2%'), fontWeight: 'bold'}}>Pet Services required: </Text>
                                        <Text style={{color: 'black', fontSize: hp('2.1%'), marginLeft: 10}}>{item?.pet_purpose_type}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{color: 'black', fontSize: hp('2%'), fontWeight: 'bold'}}>Pet's size: </Text>
                                        <Text style={{color: 'black', fontSize: hp('2.1%'), marginLeft: 10}}>{item?.pet_size}</Text>
                                    </View>
                                </View>

                                <View style={{flexDirection: 'row', marginVertical: 10, alignItems:'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, alignSelf: 'center'}}>
                                    <TouchableOpacity onPress={() => acceptRequest(item?._id)} style={{ height: 40, width: '48%', backgroundColor: COLORS.secondary_with_opacity, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>Accept</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => rejectRequest(item?._id)} style={{ height: 40, width: '48%', borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'red', marginTop: 5 }}>
                                        <Text style={{ color: 'black' }}>Reject</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }else if(item?.pet_sitter_accept_status === 'accept'){
                        return (
                            <View style={{ width: wp('90%'), backgroundColor: "white", borderRadius: 10, marginTop: 10, paddingVertical: 10 }}>
                                <View style={{width: wp('88%'), marginVertical: 10, backgroundColor: "white", borderRadius: 10, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingHorizontal: 10, justifyContent: 'space-between' }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        {
                                            item?.pet_images?.length > 0 ? (
                                                <Image source={{uri: `${BasUrl}/${item?.pet_images[0]}`}} style={{width: 60, height: 60, borderRadius: 4, backgroundColor: 'grey'}} />
                                            ) : (
                                                <FontAwesome
                                                    name={"photo"}
                                                    size={50}
                                                    color={'gray'}
                                                />
                                            )
                                        }
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={[styles.HeadingText, { fontWeight: 'bold' }]}>{`${item?.pet_nickname}, ${item?.pet_age}`}</Text>
                                            <Text style={[styles.HeadingText,]}>55 km, Art. Director</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{width: '92%', alignSelf: 'center', marginVertical: 5}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{color: 'black', fontSize: hp('2%'), fontWeight: 'bold'}}>Pet Services required: </Text>
                                        <Text style={{color: 'black', fontSize: hp('2.1%'), marginLeft: 10}}>{item?.pet_purpose_type}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{color: 'black', fontSize: hp('2%'), fontWeight: 'bold'}}>Pet's size: </Text>
                                        <Text style={{color: 'black', fontSize: hp('2.1%'), marginLeft: 10}}>{item?.pet_size}</Text>
                                    </View>
                                </View>

                                <View style={{flexDirection: 'row', marginVertical: 10, alignItems:'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10, alignSelf: 'center'}}>
                                    <TouchableOpacity style={{ height: 40, width: '100%', backgroundColor: COLORS.primary, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>Chat</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                }}
            />

        </FastImage>
    )
}

export default NotificationScreen


const styles = StyleSheet.create({
    HeadingText: {
        color: COLORS.black,
        fontSize: 15
    },
    container: {
        backgroundColor: COLORS.text_white,
        width: '96%',
        paddingHorizontal: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 40
    },
    header: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: '600',
        color: COLORS.black
    },
    domestic: {
        borderColor: '#1EBA1E'
    },
    txtInput: {
        height: 50,
        width: wp('90%'),
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: COLORS.text_placeholder,
        borderRadius: 5,
        marginTop: 5
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
        borderRadius: 5
    }
})