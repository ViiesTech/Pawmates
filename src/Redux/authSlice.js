import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from "react-native-toast-message";

const initialState = {
  user: [],
  token: "",
  isLoading: false,
  isError: false,
};

export const UserLogin = createAsyncThunk("user", async (config) => {
  return axios(config)
  .then((response) => {
    if(!response.data.success){
      showToast('error', response.data.message);
    }
    return response.data;
  })
  .catch((error) => {
    showToast('error', error.message);
    return error.message
  })
});

const showToast = (type,msg) =>{
    Toast.show({
        type: type,
        text1: msg,
    })
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SignIn: (state, action) => {
      state.user = action.payload;
    },
    makeLoadingFalse: (state, action) => {
      state.isLoading = false
    },
    updateSitterStatus: (state, action) => {
      state.user.petSitter_update_status = action.payload
    },
    updatePetAddStatus: (state, action) => {
      state.user.pet_add_status = action.payload
    },
    logOut: (state) => {
      state.token = ""
      state.user = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserLogin.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(UserLogin.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.data?.token;
    });
    builder.addCase(UserLogin.rejected, (state, action)=>{
      state.isLoading = false

    })
  },
});

export const {SignIn, logOut, makeLoadingFalse, updateSitterStatus, updatePetAddStatus} = authSlice.actions;
export default authSlice.reducer;
