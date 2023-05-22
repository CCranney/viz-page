import { configureStore } from '@reduxjs/toolkit';
import visibilityReducer from './slices/visibilitySlice';
import tooltipReducer from './slices/tooltipSlice';

export const store = configureStore({
  reducer: {
    visibility: visibilityReducer,
    tooltip: tooltipReducer,
  },
});
