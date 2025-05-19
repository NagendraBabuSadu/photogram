export interface State {
  count: number;
  todos: string[];
}

export type Action = { type: "increment" } | { type: "add_todo" };

export const initialState = {
  count: 0,
  todos: [],
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };
    case "add_todo":
      return {
        ...state,
        todos: [...state.todos, "new Todo"],
      };
    default:
      return state;
  }
}
