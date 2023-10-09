import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import Route from "./src/Navigation/Route";
import SplashScreen from "react-native-splash-screen";
import { persistStore } from "redux-persist";
import { store } from "./src/Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  let persistor = persistStore(store);

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
