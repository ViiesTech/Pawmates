import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useEffect} from 'react'
import images from '../../../Constants/images';

const IconScreen = ({navigation}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
          navigation.navigate('GoThrough'); 
        }, 3000); 
    
        return () => clearTimeout(timeout);
      }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Image source={images.backGroundScreen} resizeMode='stretch' style={{height:'100%', width:'100%'}}></Image>
    </View>
  )
}

export default IconScreen

const styles = StyleSheet.create({})