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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../Constants/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';


const Profile = ({navigation}) => {
    return (
        <FastImage source={images.BackGround} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>

            <View style={{ height: 100, width: 100, backgroundColor: "white", borderRadius: 100, marginTop: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <Ionicons
                    name={"person"}
                    size={40}
                    color={'gray'}
                />
            </View>
            <Text style={[styles.HeadingText, { fontWeight: 'bold', alignSelf: 'center', marginTop:20 }]}>Zoe 21</Text>
            <Text style={{ color: COLORS.black, width: widthPercentageToDP('70%'), alignSelf: 'center', textAlign: 'center' }}>Lorem ipsum dolor sit amet, consectetur
                adipiscing elit</Text>


            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <View style={{ height: 210, width: 150, backgroundColor: "white", borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginRight: 5 }}>
                    <Ionicons
                        name={"person"}
                        size={40}
                        color={'gray'}
                    />
                </View>

                <View>
                    <View style={{ height: 100, width: 100, backgroundColor: "white", borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Ionicons
                            name={"person"}
                            size={40}
                            color={'gray'}
                        />
                    </View>
                    <View style={{ height: 100, width: 100, backgroundColor: "white", borderRadius: 10, marginTop: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Ionicons
                            name={"person"}
                            size={40}
                            color={'gray'}
                        />
                    </View>
                </View>


                <View style={{ marginLeft: 5 }}>
                    <View style={{ height: 100, width: 100, backgroundColor: "white", borderRadius: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Ionicons
                            name={"person"}
                            size={40}
                            color={'gray'}
                        />
                    </View>
                    <View style={{ height: 100, width: 100, backgroundColor: "white", borderRadius: 10, marginTop: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Ionicons
                            name={"person"}
                            size={40}
                            color={'gray'}
                        />
                    </View>
                </View>
            </View>


            <Text style={[styles.HeadingText, { fontWeight: 'bold', marginTop:20 }]}>About</Text>
            <Text style={{ color: COLORS.black, width: widthPercentageToDP('70%'),}}>Lorem ipsum dolor sit amet, consectetur
                adipiscing elit</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ height: 60, width: widthPercentageToDP('90%'), alignSelf: 'center', backgroundColor: COLORS.secondary_with_opacity, alignItems: 'center', justifyContent: 'center', borderRadius: 200, marginTop: 20 }}>
                <Text style={{ color: COLORS.text_white }}>Continue</Text>
            </TouchableOpacity>
        </FastImage>
    )
}

export default Profile


const styles = StyleSheet.create({
    HeadingText: {
        color: COLORS.black,
        fontSize: 20
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
