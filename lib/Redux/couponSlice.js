import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  couponCode: null, 
  discount: 0, 
  isCouponApplied: false,
  error: null, 
  deviceId: null,
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
});

export const { setCoupon, clearCoupon, setCouponError,setDeviceId } = couponSlice.actions;

export default couponSlice.reducer;












// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { 
//   GetAllCoupon, 
//   CreateCouponapi, 
//   ApplyCouponapi, 
//   UpadteCouponapi, 
//   DeleteCouponapi 
// } from "@/lib/API/Coupon";

// // Thunks for API calls
// export const fetchAllCoupons = createAsyncThunk(
//   "coupon/fetchAllCoupons",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await GetAllCoupon();
//       if (response.status) {
//         return response.data;
//       } else {
//         return rejectWithValue(response.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const createCoupon = createAsyncThunk(
//   "coupon/createCoupon",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await CreateCouponapi(data);
//       if (response.status) {
//         return response.data;
//       } else {
//         return rejectWithValue(response.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const applyCoupon = createAsyncThunk(
//   "coupon/applyCoupon",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await ApplyCouponapi(data);
//       if (response.status) {
//         return response.data;
//       } else {
//         return rejectWithValue(response.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateCoupon = createAsyncThunk(
//   "coupon/updateCoupon",
//   async ({ data, id }, { rejectWithValue }) => {
//     try {
//       const response = await UpadteCouponapi(data, id);
//       if (response.status) {
//         return response.data;
//       } else {
//         return rejectWithValue(response.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteCoupon = createAsyncThunk(
//   "coupon/deleteCoupon",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await DeleteCouponapi(id);
//       if (response.status) {
//         return response.message; // Assuming the API returns a success message
//       } else {
//         return rejectWithValue(response.message);
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Initial state
// const initialState = {
//   coupons: [],
//   loading: false,
//   error: null,
//   successMessage: null,
// };

// // Slice
// const couponSlice = createSlice({
//   name: "coupon",
//   initialState,
//   reducers: {
//     clearMessages: (state) => {
//       state.error = null;
//       state.successMessage = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch All Coupons
//       .addCase(fetchAllCoupons.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllCoupons.fulfilled, (state, action) => {
//         state.loading = false;
//         state.coupons = action.payload;
//       })
//       .addCase(fetchAllCoupons.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Create Coupon
//       .addCase(createCoupon.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createCoupon.fulfilled, (state, action) => {
//         state.loading = false;
//         state.successMessage = "Coupon created successfully!";
//         state.coupons.push(action.payload);
//       })
//       .addCase(createCoupon.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Apply Coupon
//       .addCase(applyCoupon.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(applyCoupon.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(applyCoupon.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Update Coupon
//       .addCase(updateCoupon.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateCoupon.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.coupons.findIndex(
//           (coupon) => coupon._id === action.payload._id
//         );
//         if (index !== -1) {
//           state.coupons[index] = action.payload;
//         }
//       })
//       .addCase(updateCoupon.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Delete Coupon
//       .addCase(deleteCoupon.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(deleteCoupon.fulfilled, (state, action) => {
//         state.loading = false;
//         state.successMessage = action.payload;
//         state.coupons = state.coupons.filter(
//           (coupon) => coupon._id !== action.meta.arg
//         );
//       })
//       .addCase(deleteCoupon.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearMessages } = couponSlice.actions;

// export default couponSlice.reducer;
