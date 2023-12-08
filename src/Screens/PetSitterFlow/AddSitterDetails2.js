import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import {COLORS} from '../../Constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BackButton from '../../Components/BackButton';
import InputField from '../../Components/InputField';
import Toast from 'react-native-toast-message';

const AddSitterDetails2 = ({navigation, route}) => {
  const {gender, services, location, animalType, petSizes} = route.params;
  const [age, setAge] = useState('');
  const [about, setAbout] = useState('');

  const showToast = (type,msg) =>{
    Toast.show({
        type: type,
        text1: msg,
    })
    }

  return (
    <FastImage
      source={images.BackGround}
      style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <BackButton
        onPressBack={() => navigation.goBack()}
        style={{position: 'absolute', top: 10, left: 6, zIndex: 10}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <Text style={styles.HeadingText}>Age</Text>
        <InputField
          placeholder={'Write you age'}
          keyboardType={'number-pad'}
          value={age}
          onChangeText={changedText => setAge(changedText)}
          style={{marginTop: 8, marginBottom: hp('4%')}}
        />

        <Text style={styles.HeadingText}>About</Text>
        <InputField
          placeholder={'Tell us more about yourself...'}
          multiline={true}
          numberOfLines={8}
          value={about}
          onChangeText={changedText => setAbout(changedText)}
          style={{
            marginTop: 8,
            marginBottom: hp('4%'),
            textAlignVertical: 'top',
            paddingVertical: 15,
            paddingHorizontal: 20,
          }}
        />

        <TouchableOpacity
          onPress={() => {
            if(age.length > 0 && about.length > 0){
                navigation.navigate('AddPhoto', {gender, services, location, animalType, petSizes, age, about})
            }else {
                showToast('error', "You can't leave any field empty!")
            }
          }}
          style={styles.btnContainer}>
          <Text style={{color: COLORS.text_white}}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </FastImage>
  );
};

export default AddSitterDetails2;

const styles = StyleSheet.create({
  HeadingText: {
    color: COLORS.black,
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 8,
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
  animalTypeStyle: {
    width: wp('40%'),
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'lightgrey',
    borderRadius: 8,
    margin: 5,
  },
  eachSizeStyle: {
    width: wp('40%'),
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'lightgrey',
    borderRadius: 8,
    margin: 5,
  },
  btnContainer: {
    height: 60,
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: COLORS.secondary_with_opacity,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    marginTop: 20,
  },
});
