import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const wishNumber = createAsyncThunk("wishCounter/getNum", async () => {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
  return data.data;
});
const wishCounterSlice = createSlice({
  name: "wishCounter",
  initialState: {
    wishCounter: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(wishNumber.fulfilled, (state, action) => {
     state.wishCounter= action.payload.length;
    });
  },
});

export default wishCounterSlice.reducer;
