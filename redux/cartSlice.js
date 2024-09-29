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
      
      // Check if the product already exists in the cart
      const existingProduct = state.products.find((item) => item._id === product._id);
      
      if (existingProduct) {
        // If the product exists, increase the quantity and update the total
        existingProduct.quantity += product.quantity;
      } else {
        // If the product doesn't exist, push it as a new item
        state.products.push(product);
      }
      
      // Increase the total quantity of items in the cart
      state.quantity += product.quantity;
      
      // Update the cart's total price
      state.total += product.price * product.quantity;
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
