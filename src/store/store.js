import { configureStore } from '@reduxjs/toolkit';
import favsReducer from '../favs/favSlice';

export const store = configureStore({
  reducer: {
    favs: favsReducer
  }
});