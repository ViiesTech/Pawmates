import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import images from "../../Constants/images";
import { COLORS } from "../../Constants/theme";
import CustomText from "../../Components/Text";

const GoThrough = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          source={images.AuthBackground}
          resizeMode="cover"
          style={{ height: '55%', width: "100%" }}
        />
        <View style={{ marginHorizontal: 35 }}>
          <TouchableOpacity
            style={[
              styles.container,
              { marginTop: 25, backgroundColor: "black" },
            ]}
          >
            <Image source={images.apple_icon} style={{ marginRight: 20 }} />
            <CustomText style={styles.txt} text={"Continue with Apple"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.container, {}]}>
            <Image source={images.Google_Icon} style={{ marginRight: 20 }} />
            <CustomText
              style={[styles.txt, { color: "black" }]}
              text={"Continue with Google"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.container, { backgroundColor: "#1878F3" }]}
          >
            <Image source={images.Facebook_Logo} style={{ marginRight: 20 }} />
            <CustomText style={styles.txt} text={"Continue with Facebook"} />
          </TouchableOpacity>
          <CustomText
            text={
              "By registering, you agree to our Terms of Service, Privacy     Policy and Cookie Policy"
            }
            style={styles.policyTxt}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={[
              styles.container,
              { marginTop: 30, backgroundColor: "#376CE3" },
            ]}
          >
            <CustomText style={styles.txt} text={"Get Started"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GoThrough;

const styles = StyleSheet.create({
  App_title_txt:{
      fontSize:28,
      fontWeight:'bold',
  },
  title_txt:{
      fontSize:19,
      fontWeight:'bold',
      marginTop:15
  },
  container: {
      height: 50,
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      backgroundColor:'white',
      borderRadius:30,
      marginTop:10,
      flexDirection:'row',

    },
    txt:{
      color:'white'
    },
    container_Email:{
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor:COLORS.primary,
      borderRadius:10,
      marginTop:15,
      alignContent:'center',
      flexDirection:'row'
    },
    devider_View:{
      height:2,
      backgroundColor:'#D4D4D4',
      marginTop:30,
      borderRadius:10
    },
    policyTxt:{
      fontSize:11,
      marginTop:10
    }
    
}) 
