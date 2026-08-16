import { createSlice } from '@reduxjs/toolkit';

let initialWishlist = [];
try {
  const saved = localStorage.getItem('wishlist');
  if (saved) initialWishlist = JSON.parse(saved);
} catch (e) {
  console.error("Failed to parse wishlist from local storage", e);
}

const initialState = {
  items: initialWishlist,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(item => item._id === product._id);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlist');
    }
  }
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
