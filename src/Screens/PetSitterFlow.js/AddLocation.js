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

import { COLORS } from '../../Constants/theme';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/authSlice';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import InnerButton from '../../Components/innerButton';

const AddLocation = ({navigation}) => {
    return (
        <FastImage source={images.BackGround} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <Text style={[styles.HeadingText,]}>Location</Text>
                <Text style={[styles.HeadingText,]}>NewYork {">"}</Text>
            </View>

            <Text style={[styles.HeadingText, { marginTop: 20 }]}>First Name</Text>
            <TextInput
                style={styles.txtInput}
            />
            <Text style={[styles.HeadingText, { marginTop: 20 }]}>Last Name</Text>
            <TextInput
                style={styles.txtInput}
            />

            <Text style={[styles.HeadingText, { marginTop: 20 }]}>Location</Text>
            <TextInput
                style={styles.txtInput}
            />

            <Text style={[styles.HeadingText, { marginTop: 20 }]}>Age</Text>
            <TextInput
                style={styles.txtInput}
            />


            <TouchableOpacity onPress={() => navigation.navigate("AddPhoto")} style={{ height: 60, width: widthPercentageToDP('90%'), alignSelf: 'center', backgroundColor: COLORS.secondary_with_opacity, alignItems: 'center', justifyContent: 'center', borderRadius: 200, marginTop: 20 }}>
                <Text style={{ color: COLORS.text_white }}>Continue</Text>
            </TouchableOpacity>
        </FastImage>
    )
}

export default AddLocation


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