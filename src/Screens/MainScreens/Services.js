import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import Headertext from "../../Components/HeaderText";
import InnerButton from "../../Components/innerButton";
import { COLORS } from "../../Constants/theme";
import BackButton from "../../Components/BackButton";

const Service = ({ navigation }) => {
  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>

      <BackButton onPressBack={() => navigation.goBack()} />
      <Headertext />
      <View style={styles.container}>
        <Text style={styles.header}>
          I'm looking for service {"\n"} for my:
        </Text>
        <InnerButton
          buttonText={"CAT"}
          onPress={() => navigation.navigate("WhichAnimal")}
          Lefticon={true}
          name="user"
          type={"feather"}
          color={COLORS.black}
          size={20}
        />


        <View style={{ height: 30 }} />
      </View>
    </FastImage>
  );
};

export default Service;

const styles = StyleSheet.create({
  container:{
      backgroundColor:COLORS.text_white,
      width:'98%',
      paddingHorizontal:15,
      borderRadius:20,
      justifyContent:'center',
      alignSelf:'center',
      marginVertical:20
  },
  header:{
      alignSelf:'center',
      fontSize:20,
      marginTop:20,
      fontWeight:'600'
  },
  domestic:{
      borderColor:'#1EBA1E'
  }
})