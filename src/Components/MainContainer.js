import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import images from '../Constants/images'

const MainContainer = ({childern, style}) => {
  return (
   <FastImage style={[styles.container, style]} source={images.BackGround}>
    {childern}
   </FastImage>
  )
}

export default MainContainer

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})