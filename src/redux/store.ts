// store.ts
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import usersReducer from "./users/usersSlice";
import roleReducer from "./role/roleSlice";
import eventsReducer from "./event/eventSlice";
import carReducer from "./car/carSlice";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    users: usersReducer,
    roles: roleReducer,
    events: eventsReducer,
    cars: carReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
