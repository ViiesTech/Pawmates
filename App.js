import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Route from './src/Navigation/Route'
import SplashScreen from 'react-native-splash-screen'

const App = () => {


useEffect(() => {
SplashScreen.hide();
},[])


  return (

    <Route/>
  )
}

export default App