import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    Alert,
    TextInput
} from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import CustomText from '../../Components/Text';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../Constants/theme';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/authSlice';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import InnerButton from '../../Components/innerButton';

const NotificationScreenn = ({navigation}) => {
    const arr = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
        { id: 4, },
        { id: 5, },
        { id: 6, }
    ];
    
    const fetchAllRequests = () => {
        console.log("lkjasd")
    }

    return (
        <FastImage source={images.BackGround} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginVertical: 20}}>
                <Fontisto name="angle-left" size={22} color={'black'} onPress={() => navigation.goBack()} />
                <Text style={[styles.HeadingText, { fontWeight: 'bold', fontSize: 25 }]}>Your Requests</Text>
            </View>

            <FlatList
                data={arr}
                renderItem={({ item }) => {
                    return (
                        <View style={{ height: 120, width: widthPercentageToDP('90%'), backgroundColor: "white", borderRadius: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome
                                    name={"photo"}
                                    size={50}
                                    color={'gray'}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={[styles.HeadingText, { fontWeight: 'bold' }]}>Marlene, 21</Text>
                                    <Text style={[styles.HeadingText,]}>55 km, Art. Director</Text>
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity style={{ height: 40, width: 100, backgroundColor: 'red', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white' }}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: 40, width: 100, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'red', marginTop: 5 }}>
                                    <Text style={{ color: 'black' }}>Chat Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />

        </FastImage>
    )
}

export default NotificationScreenn


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
        width: widthPercentageToDP('90%'),
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: COLORS.text_placeholder,
        borderRadius: 5,
        marginTop: 5
    }
})