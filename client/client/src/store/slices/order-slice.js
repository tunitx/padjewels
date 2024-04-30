const { createSlice } = require("@reduxjs/toolkit");

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { setOrders, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
