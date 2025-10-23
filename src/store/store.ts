import { configureStore } from '@reduxjs/toolkit';
import isModalOpenReducer from './slices/isModalOpen';

export const store = configureStore({
  reducer: {
    isModalOpen: isModalOpenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;