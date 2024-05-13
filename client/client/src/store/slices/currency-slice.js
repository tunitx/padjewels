const { createSlice } = require('@reduxjs/toolkit');

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencySymbol: "₹",
        currencyName: "INR",
        currencyRate: 1
    },
    reducers: {
        setCurrency(state, action) {
            const currencyName = action.payload;

            if (currencyName === "USD") {
                state.currencySymbol = "$";
                state.currencyRate = 0.013; // example rate
                state.currencyName = currencyName;
            }
            if (currencyName === "EUR") {
                state.currencySymbol = "€";
                state.currencyRate = 0.012; // example rate
                state.currencyName = currencyName;
            }
            if (currencyName === "GBP") {
                state.currencySymbol = "£";
                state.currencyRate = 0.010; // example rate
                state.currencyName = currencyName;
            }
            if (currencyName === "INR") {
                state.currencySymbol = "₹";
                state.currencyRate = 1;
                state.currencyName = currencyName;
            }
        }
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;