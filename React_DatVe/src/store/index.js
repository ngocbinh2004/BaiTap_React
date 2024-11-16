import { configureStore } from "@reduxjs/toolkit";
import bookingTicketReducer from "./../_pages/HomeTemplate/HomePage/duck/reducer";

const store = configureStore({
  reducer: {
    bookingTicketReducer, // bookingTicketReducer: bookingTicketReducer
  },
});

export default store;
