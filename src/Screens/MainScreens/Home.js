import {
    StyleSheet,
    Alert,
    TouchableOpacity,
    View,
    ScrollView,
    Text,
    Image,
    ImageBackground
} from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../Constants/images';
import { COLORS } from '../../Constants/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BasUrl from '../../BasUrl';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

const Home = ({navigation}) => {
    const {token} = useSelector(state => state.authData);
    const [myPets, setMyPets] = useState([]);

    const fetchAllMyPets = () => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BasUrl}/pet/getall-Mypet`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
                if(response.data.success){
                    setMyPets(response.data.data);
                }else {
                    console.log(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAllMyPets()
        })
        return unsubscribe
    }, [navigation])


    return (
        <ImageBackground source={images.BackGround} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <View style={{width: wp('88%'), flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
                <Fontisto name="player-settings" size={25} color={'black'} onPress={() => navigation.navigate('Settings')}  />
                <Fontisto name="bell-alt" size={25} color={'black'} onPress={() => navigation.navigate('Notifications')} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
            <Image source={require('../../Assets/Images/logo.png')} style={{width: wp('70%'), height: hp('18%'), objectFit: 'contain', alignSelf: 'center'}} />
            
            <Text style={{color: 'black', fontSize: hp('3%'), fontWeight: 'bold', width: wp('90%'), alignSelf: 'center', marginVertical: hp('3%')}}>Tap any of your pets to see special pet sitters for your pet</Text>
            {
                myPets.length > 0 ? (
                    myPets.map((eachPet, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('SearchResults', {pet_category: eachPet.cat_name, pet_service: eachPet.pet_purpose_type, pet_id: eachPet._id})} activeOpacity={0.6} style={styles.cardCont}>
                                {
                                    eachPet.images.length > 0 ? (
                                        <>
                                            <FastImage source={{uri: `${BasUrl}/${eachPet.images[0]}`}} style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1}} />
                                            <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.22)', position: 'absolute', top: 0, left: 0, zIndex: 1}} />
                                        </>
                                    ) : (
                                        <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems:'center', position: 'absolute', top: 0, left: 0, zIndex: -1}}>
                                            <Text style={{color: 'rgba(0,0,0,0.4)', fontWeight: 'bold', letterSpacing: 3, fontSize: hp('2%')}}>No Image Uploaded</Text>
                                        </View>
                                    )
                                }
    
                                <View style={{position:'absolute', bottom: 44, left: 20, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 10, padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color: COLORS.black, fontSize: hp('2.8%'), fontWeight: 'bold'}}>{eachPet.pet_nickname}</Text>
                                    <Text style={{color: COLORS.black, fontSize: hp('2.8%'), fontWeight: 'bold'}}> . </Text>
                                    <Text style={{color: COLORS.black, fontSize: hp('2.8%'), fontWeight: 'bold'}}>{eachPet.age}</Text>
                                </View>
                                <Text style={{position:'absolute', bottom: 10, left: 20, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 6, padding: 5, color: COLORS.black, fontSize: hp('2%'), fontWeight: 'bold'}}>{eachPet.pet_type}</Text>
    
                            </TouchableOpacity>
                        )
                    })
                ) : (
                    <Text style={{alignSelf: 'center', fontSize: hp('2%')}}>Can't find any pets of yours</Text>
                )
            }
            </ScrollView>
            
        </ImageBackground>
    )
}

export default Home


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
    cardCont: {width: wp('90%'), alignSelf: 'center', height: hp('20%'), borderRadius: 10, overflow:'hidden', marginVertical: 8, backgroundColor: 'grey'},
})