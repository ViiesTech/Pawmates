import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Headertext = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize:25}}>
          BOOK
          <Text> TRUSTED </Text>
          SITTERS
        </Text>
      </View>
      <View>
        <Text style={{fontSize:25}}>
          AND
          <Text> PET SITTERS.</Text>
        </Text>
      </View>
    </View>
  );
};

export default Headertext;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:15,
    alignItems:'center',
    marginTop:30
  },
});
