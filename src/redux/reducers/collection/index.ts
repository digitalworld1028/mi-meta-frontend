import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../storeConfig/store'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: 1000, 
  headers: {'Content-Type': 'application/json'}
});

interface CollectionState {
  collection: Array<any>
}

const initialState: CollectionState = {
  collection: []
}

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    getCollection: (state, action) => {
      state.collection = action.payload;
    },
    makeHide: (state, action) => {
      let buffer = state.collection;
      if (buffer.findIndex((each) => each._id == action.payload.collectionId) != -1) {
        buffer[buffer.findIndex((each) => each._id == action.payload.collectionId)].hide = !buffer[buffer.findIndex((each) => each._id == action.payload.collectionId)].hide;
        state.collection = [...buffer];
      }
    },
    makeBurn: (state, action) => {
      let buffer = state.collection;
      state.collection = [...buffer.filter((e) => e._id != action.payload.collectionId)];
    }
  }
})

export const getCollectionSide = () => (dispatch:any) => {
  instance.get('collection/get').then((resp:any)=>{
    if (resp.data.message == "success") {
      dispatch(getCollection(resp.data.data));
    }
  })
}

export const makeHideSide = (collectionId:any) => (dispatch:any) => {
  instance.post('collection/makeHide', {collectionId}).then((resp:any)=>{
    if (resp.data.message == "success") {
      console.log(resp.data.message);
      dispatch(makeHide({collectionId}));
    }
  })
}

export const makeBurnSide = (collectionId:any) => (dispatch:any) => {
  instance.post('collection/makeBurn', {collectionId}).then((resp:any)=>{
    if (resp.data.message == "success") {
      console.log(resp.data.message);
      dispatch(makeBurn({collectionId}));
    }
  })
}

export const { getCollection, makeHide, makeBurn} = collectionSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.collection.collection

export default collectionSlice.reducer