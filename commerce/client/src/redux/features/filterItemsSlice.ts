import { combineSlices, createSlice } from "@reduxjs/toolkit";
import CardsData from "../../data/CardData";

interface Item {}

const initialState = {
  items: CardsData,
  filteredItems: CardsData,
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    searchItems: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      console.log("searchtrm", searchTerm);
      state.filteredItems = state.items.filter((item) =>
        item.dish.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { searchItems } = filterSlice.actions;
export default filterSlice.reducer;
