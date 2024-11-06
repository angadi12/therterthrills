// addOnsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const addOnsSlice = createSlice({
  name: "addOns",
  initialState: {
    decorations: {},
    roses: {},
    photography: [],
    totalAmount: 0,
  },
  reducers: {
    addDecoration: (state, action) => {
      const { name, price } = action.payload;
      state.decorations[name] = (state.decorations[name] || 0) + 1;
      state.totalAmount += price;
    },
    removeDecoration: (state, action) => {
      const { name, price } = action.payload;
      if (state.decorations[name] > 1) {
        state.decorations[name] -= 1;
        state.totalAmount -= price;
      } else {
        delete state.decorations[name];
        state.totalAmount -= price;
      }
    },
    addRose: (state, action) => {
      const { name, price } = action.payload;
      state.roses[name] = (state.roses[name] || 0) + 1;
      state.totalAmount += price;
    },
    removeRose: (state, action) => {
      const { name, price } = action.payload;
      if (state.roses[name] > 1) {
        state.roses[name] -= 1;
        state.totalAmount -= price;
      } else {
        delete state.roses[name];
        state.totalAmount -= price;
      }
    },
    togglePhotography: (state, action) => {
      const { name, price } = action.payload;
      if (state.photography.includes(name)) {
        state.photography = state.photography.filter((item) => item !== name);
        state.totalAmount -= price;
      } else {
        state.photography.push(name);
        state.totalAmount += price;
      }
    },
  },
});

export const {
  addDecoration,
  removeDecoration,
  addRose,
  removeRose,
  togglePhotography,
} = addOnsSlice.actions;

export const selectAddOns = (state) => state.addOns;
export const selectTotalAmount = (state) => state.addOns.totalAmount;

export default addOnsSlice.reducer;
