import { View, Text } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import images from "../../../Constants/images";
import Headertext from "../../../Components/HeaderText";
import { styles } from "./index.style";
import InnerButton from "../../../Components/innerButton";
import InputField from "../../../Components/InputFiled";
import CustomButton from "../../../Components/Button";
import { COLORS } from "../../../Constants/theme";
import DatePicker from "react-native-date-picker";
import BackButton from "../../../Components/Back Button";

const Boarding = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  return (
    <FastImage source={images.BackGround} style={{ flex: 1 }}>
      <BackButton onPressBack={() => navigation.goBack()} />
      <Headertext />
      <View style={styles.container}>
        <Text style={styles.header}>Boarding near</Text>

        <InputField placeholder={"Zip Code or address"} />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DatePicker
          modal
          open={endOpen}
          date={endDate}
          onConfirm={(date) => {
            setEndOpen(false);
            setEndDate(date);
          }}
          onCancel={() => {
            setEndOpen(false);
          }}
        />
        <InnerButton
          buttonText={date.toDateString()}
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
          onPress={() => navigation.navigate("PetSize")}
        />
      </View>
    </FastImage>
  );
};

export default Boarding;
