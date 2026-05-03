import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // ✅ ADD ITEM
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // ✅ REMOVE ITEM
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.name !== action.payload.name
      );
    },

    // ✅ UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find(item => item.name === name);

      if (item) {
        item.quantity = amount;
      }
    }

  }
});

// ✅ EXPORT ACTIONS
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// ✅ EXPORT REDUCER
export default cartSlice.reducer;
