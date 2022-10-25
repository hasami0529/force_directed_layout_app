import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice/todo";
import contextmenuReducer from './slice/contextmenu'
import taglibReducer from './slice/taglib'
import canvasReducer from "./slice/canvas";


export default configureStore({
  reducer: {
    todo: rootReducer,
    contextmenu: contextmenuReducer,
    taglib: taglibReducer,
    canvas: canvasReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
