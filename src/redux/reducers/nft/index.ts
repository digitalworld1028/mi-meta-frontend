import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../storeConfig/store'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: 1000, 
  headers: {'Content-Type': 'application/json'}
});

interface NftState {
  nft: Array<any>
}

const initialState: NftState = {
  nft: []
}

export const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    getNft: (state, action) => {
      state.nft = action.payload;
      
    },
  }
})

export const getNftSide = () => (dispatch:any) => {
  instance.get('nft/get').then((resp:any)=>{
      if (resp.data.message == "success") {
        // state.collection = resp.data.data;
        console.log(resp.data.data);
        dispatch(getNft(resp.data.data));
      }
    })
}

export const addNftFavorite = (nftId:any, account:any) => (dispatch:any) => {
  instance.post('nft/addFavorite', {nftId, account}).then((resp:any)=>{
    if (resp.data.message == "success") {
      // state.collection = resp.data.data;
      console.log(resp.data.data);
      dispatch(getNft(resp.data.data));
    }
  })
}

export const addNftVisit = (nftId:any) => (dispatch:any) => {
  instance.post('nft/addVisit', {nftId}).then((resp:any)=>{
    if (resp.data.message == "success") {
      // state.collection = resp.data.data;
      console.log(resp.data.data);
      dispatch(getNft(resp.data.data));
    }
  })
}

export const { getNft} = nftSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.nft.nft

export default nftSlice.reducer