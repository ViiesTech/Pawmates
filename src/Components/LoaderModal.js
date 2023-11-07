import { View, ActivityIndicator, Modal, StyleSheet } from "react-native";
import React from "react";
import { Fold } from "react-native-animated-spinkit";
import { COLORS } from "../Constants/theme";

const LoaderModal = ({ visible, style, color, size }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.main_view}>
        <View
          style={{
            backgroundColor: "white",
            height: 100,
            width: 100,
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Fold
            color={color ? color : COLORS.primary}
            size={size ? size : 40}
            style={[{ marginTop: 10, alignSelf: "center" }, style]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoaderModal;

const styles = StyleSheet.create({
  main_view:{
      flex:1,
      backgroundColor:'rgba(0,0,0,0.5)',
      justifyContent:"center",
      alignItems:'center'
  },
})
