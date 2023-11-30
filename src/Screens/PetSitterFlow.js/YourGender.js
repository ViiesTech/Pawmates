import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
import React,{useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import { COLORS } from '../../Constants/theme';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import InnerButton from '../../Components/innerButton';

const YourGender = ({navigation}) => {
    const [selectedButton, setSelectedButton] = useState(null);


    return (
        <FastImage source={images.BackGround} style={{ flex: 1, justifyContent:'center' }}>
            <Text style={[styles.HeadingText, { marginTop: 20 }]}>Pawsitive care,</Text>
            <Text style={[styles.HeadingText, { fontWeight: 'bold' }]}>anywhere</Text>

            <View style={styles.container}>
                <Text style={styles.header}>
                What's your gender?
                </Text>
                <InnerButton
                    buttonText={"MALE"}
                    style={{
                        borderColor: selectedButton === "MALE" ? COLORS.primary : null,
                    }}
                    onPress={() => {
                        setSelectedButton("MALE");

                    }}
                />
                <InnerButton
                    buttonText={"WOMEN"}
                    style={{
                        borderColor: selectedButton === "WOMEN" ? COLORS.primary : null,
                    }}
                    onPress={() => {
                        setSelectedButton("WOMEN");

                    }}
                />
          
                <View style={{ height: 20 }} />
            </View>


            <TouchableOpacity onPress={()=> navigation.navigate("AddLocation")} style={{ height: 60, width: widthPercentageToDP('90%'), alignSelf: 'center', backgroundColor:COLORS.secondary_with_opacity, alignItems:'center', justifyContent:'center', borderRadius:200, marginTop:20  }}>
                        <Text style={{color:COLORS.text_white}}>Continue</Text>
            </TouchableOpacity>
        </FastImage>
    )
}

export default YourGender

const styles = StyleSheet.create({
    HeadingText: {
        color: COLORS.black,
        alignSelf: 'center',
        fontSize: 30
    },
    container:{
        backgroundColor:COLORS.text_white,
        width:'96%',
        paddingHorizontal:15,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'center',
        marginTop: 40
    },
    header:{
        alignSelf:'center',
        fontSize:20,
        marginTop:10,
        fontWeight:'600',
        color:COLORS.black
    },
    domestic:{
        borderColor:'#1EBA1E'
    }
})