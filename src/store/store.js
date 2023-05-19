import { configureStore } from '@reduxjs/toolkit';
import fillerReducer from './slices/fillerSlice';

export const store = configureStore({
  reducer: {
    filler: fillerReducer
  },
});
