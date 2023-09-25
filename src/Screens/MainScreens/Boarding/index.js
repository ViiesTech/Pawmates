import { View, Text } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import images from "../../../Constants/images";
import Headertext from "../../../Components/HeaderText";
import { styles } from "./index.style";
import InnerButton from "../../../Components/innerButton";
import InputField from "../../../Components/InputFiled";
import CustomButton from "../../../Components/Button";
import { COLORS } from "../../../Constants/theme";

const Boarding = ({ navigation }) => {
  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <Headertext />
      <View style={styles.container}>
        <Text style={styles.header}>Boarding near</Text>

        <InputField placeholder={"Zip Code or address"} />

        <InnerButton
          buttonText={"Drop off"}
          onPress={() => navigation.navigate("WhichAnimal")}
           Lefticon={true}
          name="calendar"
          type={"feather"}
          color={COLORS.black}
          size={20}
        />
        <InnerButton
          buttonText={"Pick up"}
          onPress={() => navigation.navigate("WhichAnimal")}
          Lefticon={true}
          name="calendar"
          type={"feather"}
          color={COLORS.black}
          size={20}
        />

        <View style={{ height: 30 }} />
      </View>
      <View style={{ height: '28%' }} />

      <View style={{ alignItems: "flex-end" }}>
        <CustomButton
          buttonText={"Continue"}
          style={{ borderRadius: 25 }}
          onPress={() => navigation.navigate("PetSize")}
        />
      </View>
    </FastImage>
  );
};

export default Boarding;
