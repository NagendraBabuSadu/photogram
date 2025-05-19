import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  dish: string;
  imgdata: string;
  address: string;
  delimg: string;
  somedata: string;
  price: number;
  rating: string;
  arrimg: string;
  qnty: number;
}
interface Cart {
  carts: CartItem[];
}

const initialState: Cart = {
  carts: [],
};

//card slice
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item?.id === action.payload.id
      );
      console.log("action", action);

      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
      } else {
        const tempQnty = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, tempQnty];
      }
    },

    removeItemFromCart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        if (state.carts[itemIndex].qnty > 1) {
          state.carts[itemIndex].qnty -= 1;
        } else {
          state.carts.splice(itemIndex, 1);
        }
      }
    },

    removeTotalCart: (state, action) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeItemFromCart, removeTotalCart } =
  cartSlice.actions;
export default cartSlice.reducer;
