import { View, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import images from "../../../Constants/images";
import Headertext from "../../../Components/HeaderText";
import { styles } from "./index.style";
import InnerButton from "../../../Components/innerButton";
import { COLORS } from "../../../Constants/theme";
import BackButton from "../../../Components/Back Button";

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
