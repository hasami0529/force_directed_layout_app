import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice/todo";
import contextmenuReducer from './slice/contextmenu'
import TaglibReducer from './slice/taglib'


export default configureStore({
  reducer: {
    todo: rootReducer,
    contextmenu: contextmenuReducer,
    taglib: TaglibReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
