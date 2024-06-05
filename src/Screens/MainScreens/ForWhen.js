import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import Headertext from '../../Components/HeaderText';
import InnerButton from '../../Components/innerButton';
import {COLORS} from '../../Constants/theme';
import BackButton from '../../Components/BackButton';
import { useSelector } from 'react-redux';

// We move from the screens ForWhen.js -> Services.js -> WhichAnimal.js -> Boarding.js -> PetSize.js -> AddImages.js and 
// keep filling the form for adding a pet

const ForWhen = ({navigation, route}) => {
  const {user} = useSelector(state => state.authData);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = buttonText => {
    setSelectedButton(buttonText);
  };

  return (
    <FastImage source={images.BackGround} style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>

      {user.pet_add_status ? (
        <BackButton onPressBack={() => navigation.goBack()} />
      ): null}
      <Headertext />

      <View style={styles.container}>
        <Text style={[styles.header, {width: '95%', marginTop: '7%'}]}>
          I'm looking for services {'\n'}for my:
        </Text>
        <InnerButton
          buttonText={'FARM ANIMALS'}
          style={{
            borderColor:
              selectedButton === 'animals' ? COLORS.primary : null,
          }}
          onPress={() => {
            handleButtonClick('animals');
            navigation.navigate('Service', {categName: 'animals'});
          }}
        />
        <InnerButton
          buttonText={'REPTILES'}
          style={{
            borderColor: selectedButton === 'reptiles' ? COLORS.primary : null,
          }}
          onPress={() => {
            handleButtonClick('reptiles');
            navigation.navigate('Service', {categName: 'reptiles'});
          }}
        />
        <InnerButton
          buttonText={'BIRDS'}
          style={{
            borderColor: selectedButton === 'birds' ? COLORS.primary : null,
          }}
          onPress={() => {
            handleButtonClick('birds');
            navigation.navigate('Service', {categName: 'birds'});
          }}
        />
        <InnerButton
          buttonText={'DOMESTICATED ANIMALS'}
          style={{
            borderColor:
              selectedButton === 'domesticated animals' ? COLORS.primary : null,
          }}
          onPress={() => {
            handleButtonClick('domesticated animals');
            navigation.navigate('Service', {categName: 'domesticated animals'});
          }}
        />
        <InnerButton
          buttonText={'EXOTIC ANIMALS'}
          style={{
            borderColor:
              selectedButton === 'exotic animals' ? COLORS.primary : null,
          }}
          onPress={() => {
            handleButtonClick('exotic animals');
            navigation.navigate('Service', {categName: 'exotic animals'});
          }}
        />
        <View style={{height: 20}} />
      </View>

      </ScrollView>
    </FastImage>
  );
};

export default ForWhen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.text_white,
    width: '96%',
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 45,
  },
  header: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '600',
  },
  domestic: {
    borderColor: '#1EBA1E',
  },
});