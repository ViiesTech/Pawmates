import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import Headertext from "../../Components/HeaderText";
import CustomText from "../../Components/Text";
import CustomButton from "../../Components/Button";
import { COLORS } from "../../Constants/theme";

const PetSize = ({navigation}) => {
  const Data = [
    {
      id: 1,
      title: "Small",
      size: "0-15 lbs",
    },
    {
      id: 2,
      title: "Medium",
      size: "16-40 lbs",
    },
    {
      id: 3,
      title: "Large",
      size: "41-100 lbs",
    },
    {
      id: 4,
      title: "Giant",
      size: "101+ lbs",
    },
  ];

  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <Headertext />
      <View style={styles.container}>
        <Text style={styles.header}>My Pet Size</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={Data}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatlist_container}>
                <TouchableOpacity style={styles.Data_View}>
                  <CustomText
                    text={item.title}
                    style={{ marginHorizontal: 6, fontSize: 13 }}
                  />
                  <CustomText text={item.size} />
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <View style={{ height: 30 }} />
      </View>
      <View style={{ height: "26%" }} />

      <View style={{ alignItems: "flex-end" }}>
        <CustomButton
          buttonText={"Continue"}
          style={{ borderRadius: 25 }}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </FastImage>
  );
};

export default PetSize;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.text_white,
    width: "98%",
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 40,
    fontWeight: "600",
  },
  domestic: {
    borderColor: "#707070",
  },
  flatlist_container: {
    flex: 1,
    alignItems:'center'
  },
  Data_View: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderColor: "rgba(112, 112, 112,100)",
    width: "80%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    marginTop:20
  },
});