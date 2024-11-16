import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../_pages/HomeTemplate/HomePage/duck/reducer";

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});

export default store;
