import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories",
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    return data.data;
  }
);
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    AllCategories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.AllCategories = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
