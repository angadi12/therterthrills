// redux/cakesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCakes: {},
  isEggless: false,
  cakeText: "",
};

const cakesSlice = createSlice({
  name: 'cakes',
  initialState,
  reducers: {
    toggleEggless: (state) => {
      state.isEggless = !state.isEggless;
    },
    updateCakeText: (state, action) => {
      state.cakeText = action.payload;
    },
    addCake: (state, action) => {
      const { id, name, price } = action.payload;
      if (state.selectedCakes[id]) {
        state.selectedCakes[id].quantity += 1;
      } else {
        state.selectedCakes[id] = { id, name, price, quantity: 1 };
      }
    },
    updateQuantity: (state, action) => {
      const { id, change } = action.payload;
      if (state.selectedCakes[id]) {
        state.selectedCakes[id].quantity += change;
        if (state.selectedCakes[id].quantity < 1) {
          delete state.selectedCakes[id];
        }
      }
    },
  },
});

export const { toggleEggless, updateCakeText, addCake, updateQuantity } = cakesSlice.actions;
export default cakesSlice.reducer;
