import { createSlice } from "@reduxjs/toolkit";

interface State {
  counter: number;
  todos: string[];
}

const initialState: State = {
  counter: 0,
  todos: [],
};


const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addTodo(state, action: { payload: string}) {
      state.todos.push(action.payload);
    },

    increment(state) {
      state.counter += 1;
    },
  },
});

export const {increment, addTodo} = appSlice.actions;
export default appSlice.reducer;