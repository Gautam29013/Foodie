import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: 'Online Payment',
};

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      
      // Calculate prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 40);
      state.taxPrice = addDecimals(Number((0.05 * state.itemsPrice).toFixed(2))); // 5% tax
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      
      // Recalculate prices
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      state.shippingPrice = addDecimals(state.itemsPrice > 500 || state.cartItems.length === 0 ? 0 : 40);
      state.taxPrice = addDecimals(Number((0.05 * state.itemsPrice).toFixed(2)));
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
