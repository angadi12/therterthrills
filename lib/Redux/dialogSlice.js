import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  dialogData: null, // Stores data for the currently opened dialog
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true;
      state.dialogData = action.payload; // Payload can contain the dialog-specific data
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.dialogData = null;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
