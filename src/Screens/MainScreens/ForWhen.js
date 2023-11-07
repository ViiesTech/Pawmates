import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import Headertext from "../../Components/HeaderText";
import InnerButton from "../../Components/innerButton";
import { COLORS } from "../../Constants/theme";
import BackButton from "../../Components/BackButton";

const ForWhen = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <BackButton onPressBack={() => navigation.goBack()} />
      <Headertext />
      <View style={styles.container}>
        <Text style={styles.header}>
          I'm looking for service {"\n"} for my:
        </Text>
        <InnerButton
          buttonText={"FARM ANIMALS"}
          style={{
            borderColor: selectedButton === "FARM ANIMALS" ? COLORS.primary : null,
          }}
          onPress={() => {
            handleButtonClick("FARM ANIMALS");
            navigation.navigate("Service");
          }}
        />
        <InnerButton
          buttonText={"REPTILES"}
          style={{
            borderColor: selectedButton === "REPTILES" ? COLORS.primary  : null,
          }}
          onPress={() => {
            handleButtonClick("REPTILES");
            navigation.navigate("Service");
          }}
        />
        <InnerButton
          buttonText={"BIRDS"}
          style={{
            borderColor: selectedButton === "BIRDS" ? COLORS.primary  : null,
          }}
          onPress={() => {
            handleButtonClick("BIRDS");
            navigation.navigate("Service");
          }}
        />
        <InnerButton
          buttonText={"DOMESTICATED ANIMALS"}
          style={{
            borderColor:
              selectedButton === "DOMESTICATED ANIMALS" ? COLORS.primary  : null,
          }}
          onPress={() => {
            handleButtonClick("DOMESTICATED ANIMALS");
            navigation.navigate("Service");
          }}
        />
        <InnerButton
          buttonText={"EXOTIC ANIMALS"}
          style={{
            borderColor: selectedButton === "EXOTIC ANIMALS" ? COLORS.primary  : null,
          }}
          onPress={() => {
            handleButtonClick("EXOTIC ANIMALS");
            navigation.navigate("Service");
          }}
        />
        <View style={{ height: 20 }} />
      </View>
    </FastImage>
  );
};

export default ForWhen;

const styles = StyleSheet.create({
  container:{
      backgroundColor:COLORS.text_white,
      width:'96%',
      paddingHorizontal:15,
      borderRadius:20,
      justifyContent:'center',
      alignSelf:'center',
      marginTop: 25
  },
  header:{
      alignSelf:'center',
      fontSize:20,
      marginTop:10,
      fontWeight:'600'
  },
  domestic:{
      borderColor:'#1EBA1E'
  }
})