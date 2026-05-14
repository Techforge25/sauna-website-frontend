import { combineReducers } from "@reduxjs/toolkit";

import { bookingFlowReducer } from "@/store/booking-flow-slice";

export const rootReducer = combineReducers({
  bookingFlow: bookingFlowReducer,
});
