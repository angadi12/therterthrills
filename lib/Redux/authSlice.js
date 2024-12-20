import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/lib/firebaseConfig";
import Cookies from "js-cookie";

// Async Thunks
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      if (typeof window !== "undefined" && !window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {}, // Invisible captcha's callback
          },
          auth
        );
      }
      const fullPhoneNumber = `+91${phoneNumber}`;
      const result = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        window.recaptchaVerifier
      );
      dispatch(openOtpModal()); // Dispatch action to open OTP modal
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otp, confirmationResult }, { rejectWithValue }) => {
    try {
      const otpString = otp.join("");
      const result = await confirmationResult.confirm(otpString);
      const idToken = await result.user.getIdToken();
      Cookies.set("token", idToken); // Store token in cookies for auth
      toast.success("Verification Successful!");
      return { idToken };
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  phoneNumber: "",
  otp: ["", "", "", "", "", ""],
  isLoading: false,
  error: null,
  confirmationResult: null,
  otpRequestCooldown: false, // Cooldown state for OTP resend
  cooldownTimer: 0,
  isLoginModalOpen: false,
  isOtpModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      Object.assign(state, initialState); // Reset all to initial state
    },
    startOtpCooldown: (state, action) => {
      state.otpRequestCooldown = true;
      state.cooldownTimer = action.payload; // Set initial cooldown timer value
    },
    decrementCooldown: (state) => {
      if (state.cooldownTimer > 0) {
        state.cooldownTimer -= 1;
      } else {
        state.otpRequestCooldown = false;
      }
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    openOtpModal: (state) => {
      state.isOtpModalOpen = true;
    },
    closeOtpModal: (state) => {
      state.isOtpModalOpen = false;
    },
    setIsAuthenticated: (state, action) => {
        state.isAuthenticated = true;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.confirmationResult = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Actions and Reducer
export const {
  setPhoneNumber,
  setOtp,
  clearError,
  resetAuthState,
  startOtpCooldown,
  decrementCooldown,
  openLoginModal,
  closeLoginModal,
  openOtpModal,
  closeOtpModal,
  setIsAuthenticated,
  setUser,
  clearUser
} = authSlice.actions;

export default authSlice.reducer;
