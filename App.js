import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import Route from './src/Navigation/Route'
import SplashScreen from 'react-native-splash-screen'

const App = () => {


useEffect(() => {
SplashScreen.hide();
},[])


  return (
    <SafeAreaView style={{flex: 1}}>
      <Route/>
    </SafeAreaView>
  )
}

export default App