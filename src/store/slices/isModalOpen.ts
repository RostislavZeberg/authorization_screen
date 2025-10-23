import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

interface ModalOpenState {
  isModalOpen: boolean;
}

const initialState: ModalOpenState = {
  isModalOpen: true,
};

export const isModalOpenSlice = createSlice({
  name: 'modal-open',
  initialState,
  reducers: {
    toggleIsModalOpen: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { toggleIsModalOpen, setIsModalOpen } = isModalOpenSlice.actions;
export default isModalOpenSlice.reducer;