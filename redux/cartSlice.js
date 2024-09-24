import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,   // This keeps track of the total quantity of all items in the cart
    total: 0,      // Total cost of the cart
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      
      // Push the product to the products array
      state.products.push(product);
      
      // Increase the cart quantity by the product quantity
      state.quantity += product.quantity;
      
      // Add the price to the total, taking into account the quantity
      state.total += action.payload.price * action.payload.quantity;
      console.log("Total after adding product:", state.total);
    },
    reset: (state) => {
      state.products = []; // Clear the products array
      state.quantity = 0;  // Reset the total quantity
      state.total = 0;     // Reset the total price
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
