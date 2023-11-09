import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer} from "redux-persist"
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authData: authReducer,
});

const persistConfig ={
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authData'],
    blacklist: [],
};

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});
