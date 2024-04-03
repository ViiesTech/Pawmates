import 'react-native-gesture-handler';
import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Route from "./src/Navigation/Route";
import SplashScreen from "react-native-splash-screen";
import { persistStore } from "redux-persist";
import { store } from "./src/Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";

let persistor = persistStore(store);
const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }, [])
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('./src/Assets/animations/intro_gif.gif')} style={{width: '100%', height: 300}} />
      </View>
    )
  }

  return (
    <Provider store={store}>
      <PersistGate loading ={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <Route />
          <Toast/>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
