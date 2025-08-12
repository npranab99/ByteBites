import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurantReducer",
  initialState: {
    list: [],
  },
  reducers: {
    setRestaurantList(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setRestaurantList } = restaurantSlice.actions;
export default restaurantSlice.reducer;