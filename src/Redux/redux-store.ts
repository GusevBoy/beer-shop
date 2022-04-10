import beersReducer from "./beers-reducer";
import beerReducer from "./beer-reducer";
import cartReducer from "./cart-reducer";
import thunk from 'redux-thunk';



import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    beers: beersReducer,
    beer: beerReducer,
    cart: cartReducer,
  },
  middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch