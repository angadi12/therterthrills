import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {GetAllCouponbyoffer,GetAllCoupon} from "@/lib/API/Coupon"


export const fetchcouponsByoffer = createAsyncThunk(
  "Coupon/fetchcouponsByoffer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllCouponbyoffer();
      if( response?.status=== "success")
      return response?.descriptions
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllcouponsByoffer = createAsyncThunk(
  "Coupon/fetchAllcouponsByoffer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllCoupon();
      if( response?.status=== "success")
      return response.data.coupons
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




const initialState = {
  couponCode: null, 
  discount: 0, 
  isCouponApplied: false,
  error: null, 
  deviceId: null,

  couponsoffer:[],
  couponerror: null,
  couponloading:false,

  Allcouponsoffer:[],
  Allcouponerror: null,
  Allcouponloading:false

};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon: (state, action) => {
      const { couponCode, discount } = action.payload;
      state.couponCode = couponCode;
      state.discount = discount;
      state.isCouponApplied = true;
      state.error = null;
    },
    clearCoupon: (state) => {
      state.couponCode = null;
      state.discount = 0;
      state.isCouponApplied = false;
      state.error = null;
    },
    setCouponError: (state, action) => {
      state.error = action.payload;
    },
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchcouponsByoffer.pending, (state) => {
      state.couponloading = true;
    })
    .addCase(fetchcouponsByoffer.fulfilled, (state, action) => {
      state.couponloading = false;
      state.couponsoffer= action.payload;
    })
    .addCase(fetchcouponsByoffer.rejected, (state, action) => {
      state.couponloading = false;
      state.error = action.payload;
    })

    .addCase(fetchAllcouponsByoffer.pending, (state) => {
      state.Allcouponloading = true;
    })
    .addCase(fetchAllcouponsByoffer.fulfilled, (state, action) => {
      state.Allcouponloading = false;
      state.Allcouponsoffer= action.payload;
    })
    .addCase(fetchAllcouponsByoffer.rejected, (state, action) => {
      state.Allcouponloading = false;
      state.Allcouponerror = action.payload;
    })
  }
});

export const { setCoupon, clearCoupon, setCouponError,setDeviceId } = couponSlice.actions;

export default couponSlice.reducer;












