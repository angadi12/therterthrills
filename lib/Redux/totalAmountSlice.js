import { createSlice } from "@reduxjs/toolkit";

const totalAmountSlice = createSlice({
  name: "totalAmount",
  initialState: {
    value: 0, 
  },
  reducers: {
    setTotalAmount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTotalAmount } = totalAmountSlice.actions;
export default totalAmountSlice.reducer;
