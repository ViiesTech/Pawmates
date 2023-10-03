import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import images from "../../../Constants/images";
import Headertext from "../../../Components/HeaderText";
import { styles } from "./index.style";
import InnerButton from "../../../Components/innerButton";
import CustomText from "../../../Components/Text";
import CustomButton from "../../../Components/Button";
import BackButton from "../../../Components/Back Button";

const WhichAnimal = ({ navigation }) => {
  const Data = [
    {
      id: 1,
      image: images.BOARDING,
      title: "BOARDING",
    },
    {
      id: 2,
      image: images.HOUSESITTING,
      title: "HOUSE SITTING",
    },
    {
      id: 3,
      image: images.DROPINVISIT,
      title: "DROP IN VISIT",
    },
    {
      id: 4,
      image: images.PETDAYCARE,
      title: "PET DAY CARE",
    },
    {
      id: 5,
      image: images.PETWALKING,
      title: "PET WALKING",
    },
  ];

  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <BackButton onPressBack={() => navigation.goBack()} />
      <Headertext />
      <View style={styles.container}>
        <Text style={styles.header}>For When You're Away</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={Data}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatlist_container}>
                <TouchableOpacity style={styles.Data_View}>
                  <Image source={item.image} />
                  <CustomText
                    text={item.title}
                    style={{ marginHorizontal: 6, fontSize: 13 }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <View style={{ height: 30 }} />
      </View>
      <View style={{ height: '12%' }} />

      <View style={{ alignItems: "flex-end" }}>
        <CustomButton
          buttonText={"Continue"}
          style={{ borderRadius: 25 }}
          onPress={() => navigation.navigate("Boarding")}
        />
      </View>
    </FastImage>
  );
};

export default WhichAnimal;
