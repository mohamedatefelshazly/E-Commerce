import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const cartNumber = createAsyncThunk("cartCounter/getNum", async () => {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { headers: { token: localStorage.getItem("userToken") } }
  );
  return data.data;
});
const cartConterSlice = createSlice({
  name: "cartCounter",
  initialState: {
    cartCounter: 0,
  },
  // reducers: {
  //   changeCounter: function (x) {
  //     x.cartCounter++;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(cartNumber.fulfilled, (state, action) => {
     state.cartCounter= action.payload.products.length;
    });
  },
});

export const { changeCounter } = cartConterSlice.actions;

export default cartConterSlice.reducer;
