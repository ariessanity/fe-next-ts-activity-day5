import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const TODO = "todo";
const hydrate = createAction(HYDRATE);

type Todo = {
  id: string;
  title: string;
  content: string;
};

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: TODO,
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        todos: state.todos.filter((x) => x.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => ({
      ...state,
      ...(action.payload?.[TODO] as unknown as Partial<TodoState>),
    }));
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;
