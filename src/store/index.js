import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice/todo";
import contextmenuReducer from './slice/contextmenu'
import taglibReducer from './slice/taglib'
import canvasReducer from "./slice/canvas";
import inspectReducer from './slice/inspect'


export default configureStore({
  reducer: {
    todo: rootReducer,
    contextmenu: contextmenuReducer,
    taglib: taglibReducer,
    canvas: canvasReducer,
    inspect: inspectReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
