import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice/todo";
import contextmenuReducer from './slice/contextmenu'


export default configureStore({
  reducer: {
    todo: rootReducer,
    contextmenu: contextmenuReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
