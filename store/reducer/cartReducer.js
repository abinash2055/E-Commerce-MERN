import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  products: [],
};

export const cartReducer = createSlice({
  name: "cartStore",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
    },
  },
});

export const {} = cartReducer.actions;
export default cartReducer.reducer;
