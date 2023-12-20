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
import { COLORS } from '../../Constants/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BackButton from '../../Components/BackButton';
import InputField from '../../Components/InputField';
import Toast from 'react-native-toast-message';

const AddSitterDetails = ({navigation, route}) => {
    const {gender, services} = route.params;

    const [location, setLocation] = useState('')
    const [animalType, setAnimalType] = useState(['animals'])
    const [petSizes, setPetSizes] = useState(['small'])

    const animals = [
        {
            label: 'Farm Animals',
            value: 'animals'
        },
        {
            label: 'Reptiles',
            value: 'reptiles'
        },
        {
            label:'Birds',
            value: 'birds'
        },
        {
            label: 'Domesticated Animals',
            value: 'domesticated animals'
        },
        {
            label: 'Exotic Animals',
            value: 'exotic animals'
        }
    ]
    const petSizesData = [
        {
          id: 1,
          title: "Small",
          size: "0-15 lbs",
          value: 'small'
        },
        {
          id: 2,
          title: "Medium",
          size: "16-40 lbs",
          value: 'medium'
        },
        {
          id: 3,
          title: "Large",
          size: "41-100 lbs",
          value: 'large'
        },
        {
          id: 4,
          title: "Giant",
          size: "101+ lbs",
          value: 'giant'
        },
    ];
    const showToast = (type,msg) =>{
        Toast.show({
            type: type,
            text1: msg,
        })
    }

    const selectAnimal = (tappedAnimalType) => {
        if(animalType.includes(tappedAnimalType)){
            const filteredAnimal = animalType.filter(eachAnimal => eachAnimal !== tappedAnimalType)
            setAnimalType(filteredAnimal)
        }else {
            setAnimalType([...animalType, tappedAnimalType])
        }
    }
    const selectPetSize = (tappedSize) => {
        if(petSizes.includes(tappedSize)){
            const filteredSizes = petSizes.filter(eachSize => eachSize !== tappedSize)
            setPetSizes(filteredSizes)
        }else {
            setPetSizes([...petSizes, tappedSize])
        }
    }
    
    return (
        <FastImage source={images.BackGround} style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <BackButton onPressBack={() => navigation.goBack()} style={{position: 'absolute', top: 10, left: 6, zIndex: 20}} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>

            <Text style={[styles.HeadingText, {marginBottom: -5}]}>Location</Text>
            <InputField placeholder={'Write your address'} value={location} onChangeText={changedText => setLocation(changedText)}  />

            <Text style={[styles.HeadingText, {marginTop: 20}]}>What kind of pets you can take care of?</Text>
            <View style={{flexDirection: 'row', justifyContent:'flex-start', flexWrap: 'wrap', alignItems:'center'}}>
                {
                    animals.map((eachAnimal, index) => {
                        return (
                            <TouchableOpacity onPress={() => selectAnimal(eachAnimal.value)} key={index} style={[styles.animalTypeStyle, animalType.includes(eachAnimal.value) ? {borderColor: COLORS.primary} : null]}>
                                <Text style={[styles.HeadingText, {marginBottom: 0}]}>{eachAnimal.label}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <Text style={[styles.HeadingText, {marginTop: hp('4%')}]}>What pet size you would prefer?</Text>
            <View style={{flexDirection: 'row', justifyContent:'flex-start', flexWrap: 'wrap', alignItems:'center'}}>
                {
                    petSizesData.map((eachSize, index) => {
                        return (
                            <TouchableOpacity onPress={() => selectPetSize(eachSize.value)} key={index} style={[styles.eachSizeStyle, petSizes.includes(eachSize.value) ? {borderColor: COLORS.primary} : null]}>
                                <Text style={[styles.HeadingText, {marginBottom: 0}]}>{eachSize.title}</Text>
                                <Text style={{fontSize: hp('1.8%'), color: 'grey', marginTop: 5, textAlign: 'center'}}>{eachSize.size}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

            <TouchableOpacity onPress={() => {
                if(location.length > 0, animalType.length > 0, petSizes.length > 0){
                    navigation.navigate("AddSitterDetails2", {gender, services, location, animalType, petSizes})
                }else {
                    showToast('error', "You cna't let any field empty!")
                }
            }} style={styles.btnContainer}>
                <Text style={{ color: COLORS.text_white }}>Continue</Text>
            </TouchableOpacity>
            </ScrollView>
        </FastImage>
    )
}

export default AddSitterDetails


const styles = StyleSheet.create({
    HeadingText: {
        color: COLORS.black,
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom: 8
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
    animalTypeStyle: {width: wp('40%'), height: 60, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: 'lightgrey', borderRadius: 8, margin: 5},
    eachSizeStyle: {width: wp('40%'), height: 80, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: 'lightgrey', borderRadius: 8, margin: 5},
    btnContainer: { height: 60, width: wp('90%'), alignSelf: 'center', backgroundColor: COLORS.secondary_with_opacity, alignItems: 'center', justifyContent: 'center', borderRadius: 200, marginTop: 20 }
})