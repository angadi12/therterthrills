// features/dateRange/dateRangeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// const defaultFromDate = moment().subtract(15, "days").toISOString();
// const defaultToDate = moment().toISOString();
const defaultFromDate = moment().subtract(15, "days").toISOString(); // 15 days in the past
const defaultToDate = moment().add(15, "days").toISOString(); 

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState: {
    startDate: defaultFromDate,
    endDate: defaultToDate,
  },
  reducers: {
    setDateRange: (state, action) => {
      const { startDate, endDate } = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
    },
  },
});

export const { setDateRange } = dateRangeSlice.actions;

export const selectDateRange = (state) => state.dateRange;

export default dateRangeSlice.reducer;
