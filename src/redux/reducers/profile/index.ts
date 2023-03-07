import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../storeConfig/store'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: 1000, 
  headers: {'Content-Type': 'application/json'}
});

interface ProfileState {
  profile: {_id:string, wallet:string, profileImg:{cid:string, name:string}, bannerImg:{cid:string, name:string}, username:string, bio:string, email:string, twitter:string, instagram:string, discord:string, facebook:string, tiktok:string}
}

const initialState: ProfileState = {
  profile: {_id:"", wallet:"", profileImg:{cid:"", name:""}, bannerImg:{cid:"", name:""}, username:"", bio:"", email:"", twitter:"", instagram:"", discord:"", facebook:"", tiktok:""}
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfilePicture: (state, action) => {
      state.profile.profileImg.cid = action.payload.cid;
      state.profile.profileImg.name = action.payload.name;
    }
  }
})

export const getProfileSide = (account:string) => (dispatch:any) => {
  if (account !== "") {
    instance.post('profile/get', {account}).then((resp:any)=>{
      if (resp.data.message == "success") {
        // state.collection = resp.data.data;
        console.log(resp.data.data);
        dispatch(getProfile(resp.data.data));
      }
    })
  }
}

export const getOneProfileSide = (account:string) => (dispatch:any) => {
  instance.post('profile/get', {account}).then((resp:any)=>{
    if (resp.data.message == "success") {
      // state.collection = resp.data.data;
      console.log(resp.data.data);
      // dispatch(getProfile(resp.data.data));
    }
  })
}

export const changeProfilePicture = (cid:any, name: any, account:any) => (dispatch:any) => {
  instance.post('profile/updateProfilePicture', {cid, name, account}).then((resp:any)=>{
    if (resp.data.message == "success") { 
      dispatch(updateProfilePicture({cid, name}));
    }
  })
}


export const { getProfile, updateProfilePicture} = profileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.profile.profile

export default profileSlice.reducer