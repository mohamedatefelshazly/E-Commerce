import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from "./CartCounterSlice";
import wishCounterReducer from "./wishCounterSlice";
import categoriesReducer from "./categoriesSlice";
export const storeRedux = configureStore({
  reducer: {
    cartCounterReducer,
    wishCounterReducer,
    categoriesReducer,
  },
});
