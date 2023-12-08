import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import Headertext from '../../Components/HeaderText';
import InnerButton from '../../Components/innerButton';
import {COLORS} from '../../Constants/theme';
import BackButton from '../../Components/BackButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InputField from '../../Components/InputField';
import CustomButton from '../../Components/Button';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';

const Service = ({navigation, route}) => {
  const [animalName, setAnimalName] = useState('');
  const [nickName, setNickName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');

  // dropdown picker values
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [items, setItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]);
  const {categName} = route.params;

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  return (
    <FastImage source={images.BackGround} style={{flex: 1}}>
      <BackButton onPressBack={() => navigation.goBack()} />
      <Headertext />
      <View style={styles.container}>
        <Text style={styles.header}>Please tell us more about your pet 🐨</Text>

        <InputField
          placeholder={'Your animal name, cat, dog etc.'}
          value={animalName}
          onChangeText={changedText => setAnimalName(changedText)}
        />
        <InputField
          placeholder={"Your pet's nick name"}
          value={nickName}
          onChangeText={changedText => setNickName(changedText)}
        />
        <DropDownPicker
          style={{marginTop: 20, borderColor: 'rgba(0,0,0,0.3)', color: 'grey', paddingHorizontal: 20}}
          placeholder="Your pet's gender"
          placeholderStyle={{color: 'rgba(0,0,0,0.5)'}}
          open={open}
          value={gender}
          items={items}
          setOpen={setOpen}
          setValue={setGender}
          setItems={setItems}
        />
        <InputField
          placeholder={"Your pet's age"}
          value={age}
          onChangeText={changedText => setAge(changedText)}
        />
        <InputField
          placeholder={'Breed of your pet'}
          value={breed}
          onChangeText={changedText => setBreed(changedText)}
        />
        <CustomButton
          buttonText={'Continue'}
          onPress={() => {
            if (
              animalName.length > 0 &&
              nickName.length > 0 &&
              gender &&
              age.length > 0 &&
              breed.length > 0
            ) {
              navigation.navigate('WhichAnimal', {
                categName,
                animalName,
                nickName,
                gender,
                age,
                breed,
              });
            } else {
              showToast('error', 'You must need to fill all fields');
            }
          }}
        />

        <View style={{height: 30}} />
      </View>
    </FastImage>
  );
};

export default Service;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.text_white,
    width: '98%',
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  header: {
    fontSize: hp('2.2%'),
    marginTop: 20,
    fontWeight: '600',
    width: wp('88%'),
    alignSelf: 'center',
  },
  domestic: {
    borderColor: '#1EBA1E',
  },
});
