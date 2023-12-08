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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { COLORS } from '../../Constants/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const PetRequests = ({navigation}) => {
    const arr = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
        { id: 4, },
        { id: 5, },
        { id: 6, }
    ]

    return (
        <FastImage source={images.BackGround} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginVertical: 20}}>
                <Text style={[styles.HeadingText, { fontWeight: 'bold', fontSize: 25 }]}>Your Requests</Text>
                <Fontisto name="player-settings" size={25} color={'black'} onPress={() => navigation.navigate('Settings')} />
            </View>

            <FlatList
                data={arr}
                showsVerticalScrollIndicator={false}
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

export default PetRequests


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