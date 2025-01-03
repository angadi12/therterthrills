import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  cart: [], // Stores selected items for the booking summary
  bookingDetails: {
    fullName: "",
    numberOfPeople:0,
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
  },
  addDecorations: "yes", 
  validationErrors: {},
  selectedOccasion: "Birthday",
  Occasionobject: [],
  nickname: "",
  partnerNickname: "",

  selectedDecorations: [],
  cakeText: "",
  selectedPhotography: "",
  couponCode: "",
  agreed: false,
  nickname: "",
  selectedCake: null,
  quantity: 1,
  isEggless: false,
  maxCapacity: 0, 
  extraPerPerson: 0,
  ExtraCharge:0,
  groupSize:0
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setaddDecorations: (state, action) => {
      state.addDecorations = action.payload;
    },
    setMaxcapacity: (state, action) => {
      state.maxCapacity = action.payload;
    },
    setextraperson: (state, action) => {
      state.extraPerPerson = action.payload;
    },
    setgroupSize: (state, action) => {
      state.groupSize = action.payload;
    },
    setExtraCharge: (state, action) => {
      state.ExtraCharge = action.payload;
    },

    setBookingField: (state, action) => {
      const { field, value } = action.payload;
      state.bookingDetails[field] = value;
      state.validationErrors[field] = ""; // Clear error on field update
    },
    setValidationError: (state, action) => {
      const { field, error } = action.payload;
      state.validationErrors[field] = error;
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },

    setOccasion: (state, action) => {
      state.selectedOccasion = action.payload;
    },
    setOccasionobject: (state, action) => {
      state.Occasionobject = action.payload; // Now stores the entire occasion object
    },
    setNickname: (state, action) => {
      state.nickname = action.payload.slice(0, 8); // Limit to 8 characters
    },
    setPartnerNickname: (state, action) => {
      state.partnerNickname = action.payload;
    },
    toggleDecoration: (state, action) => {
      const decoration = action.payload;
      if (state.selectedDecorations.includes(decoration)) {
        state.selectedDecorations = state.selectedDecorations.filter(
          (d) => d !== decoration
        );
      } else {
        state.selectedDecorations.push(decoration);
      }
      state.cart = updateCart(
        state.cart,
        "Decorations",
        state.selectedDecorations.join(", ")
      );
    },
    setCakeText: (state, action) => {
      state.cakeText = action.payload;
      state.cart = updateCart(state.cart, "Cake Text", action.payload);
    },
    setSelectedPhotography: (state, action) => {
      state.selectedPhotography = action.payload;
      state.cart = updateCart(state.cart, "Photography", action.payload);
    },
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    setAgreed: (state, action) => {
      state.agreed = action.payload;
    },
    setSelectedCake: (state, action) => {
      state.selectedCake = action.payload;
      state.cart = updateCart(
        state.cart,
        "Cake",
        action.payload.name || "Custom Cake"
      );
    },
    setQuantity: (state, action) => {
      const newQuantity = action.payload;
      if (newQuantity >= 1 && newQuantity <= 10) {
        state.quantity = newQuantity;
        state.cart = updateCart(state.cart, "Quantity", newQuantity);
      }
    },
    setIsEggless: (state, action) => {
      state.isEggless = action.payload;
      state.cart = updateCart(
        state.cart,
        "Eggless",
        action.payload ? "Yes" : "No"
      );
    },
    
  },
});

const updateCart = (cart, label, value) => {
  const updatedCart = [...cart];
  const index = updatedCart.findIndex((item) => item.label === label);
  if (index !== -1) {
    updatedCart[index] = { label, value };
  } else {
    updatedCart.push({ label, value });
  }
  return updatedCart;
};

export const {
  setCurrentStep,
  setBookingField,
  setValidationError,
  resetValidationErrors,
  setOccasion,
  setNickname,
  setPartnerNickname,

  setOccasionobject,


  toggleDecoration,
  setCakeText,
  setSelectedPhotography,
  setCouponCode,
  setAgreed,
  setSelectedCake,
  setQuantity,
  setIsEggless,
  setMaxcapacity,
  setextraperson,
  setExtraCharge,
  setgroupSize,
  setaddDecorations
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
