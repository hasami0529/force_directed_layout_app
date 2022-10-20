import { createSlice } from "@reduxjs/toolkit";
export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todolist: [
      { id: 1, name: "tag1" },
      { id: 2, name: "tag2" },
    ],
    tag: 'test'
  },
  reducers: {
    addTodo: (state, action) => {
      state.todolist.push(action.payload);
    },
    addTag: (state, action) => {
      state.tag = 'changed'
    }
  },
});

export const selectTodo = (state) => state.todo; // todo is respond to "name" in the slice
export const toDoActions = todoSlice.actions;
export default todoSlice.reducer;