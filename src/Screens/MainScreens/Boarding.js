import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import Headertext from "../../Components/HeaderText";
import InnerButton from "../../Components/innerButton";
import InputField from "../../Components/InputField";
import CustomButton from "../../Components/Button";
import { COLORS } from "../../Constants/theme";
import DatePicker from "react-native-date-picker";
import BackButton from "../../Components/BackButton";
import Toast from "react-native-toast-message";

const Boarding = ({ navigation, route }) => {
  const {categName, animalName, nickName, gender, age, breed, service} = route.params;
  
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [open, setOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const showToast = (type,msg) =>{
    Toast.show({
        type: type,
        text1: msg,
    })
  }

  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <BackButton onPressBack={() => navigation.goBack()} />
      <Headertext />
      <View style={styles.container}>
        <Text style={styles.header}>Boarding near</Text>
        <InputField placeholder={"Zip Code or address"} value={address} onChangeText={changedText => setAddress(changedText)} />

        <Text style={styles.header}>Schedule our services that you want</Text>
        <DatePicker
          modal
          open={open}
          date={startDate}
          minimumDate={new Date()}
          onConfirm={(date) => {
            setOpen(false);
            setStartDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DatePicker
          modal
          open={endOpen}
          date={endDate}
          minimumDate={startDate}
          onConfirm={(date) => {
            setEndOpen(false);
            setEndDate(date);
          }}
          onCancel={() => {
            setEndOpen(false);
          }}
        />
        <InnerButton
          buttonText={startDate.toDateString()}
          onPress={() => setOpen(true)}
          Lefticon={true}
          name="calendar"
          type={"feather"}
          color={COLORS.black}
          size={20}
        />
        <InnerButton
          buttonText={endDate.toDateString()}
          onPress={() => setEndOpen(true)}
          Lefticon={true}
          name="calendar"
          type={"feather"}
          color={COLORS.black}
          size={20}
        />

        <View style={{ height: 30 }} />
      </View>

      <View style={styles.btn_view}>
        <CustomButton
          buttonText={"Continue"}
          style={{ borderRadius: 25 }}
          onPress={() => {
            if(address.length > 0){
              navigation.navigate("PetSize", {categName, animalName, nickName, gender, age, breed, service, address, startDate: startDate.toISOString(), endDate: endDate.toISOString()})
            }else {
              showToast('error', 'Please write an address or a zip code!')
            }
          }}
        />
      </View>
    </FastImage>
  );
};

export default Boarding;

styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.text_white,
    width: "98%",
    paddingHorizontal: 25,
    borderRadius: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "600",
  },
  domestic: {
    borderColor: "#707070",
  },
  btn_view: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
