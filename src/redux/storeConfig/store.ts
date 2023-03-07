import { configureStore } from '@reduxjs/toolkit'
import collectionReducer from '../reducers/collection'
import nftReducer from '../reducers/nft'
import profileReducer from '../reducers/profile'

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
    nft:nftReducer,
    profile:profileReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch