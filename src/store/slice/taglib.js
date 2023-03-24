import { createSlice } from "@reduxjs/toolkit";
import { responseToTag, init } from "../../diagramlib/tag_engine";

export const taglibSlice = createSlice({
  name: "taglib",
  initialState: {
	  elementId: '',
    tags: [],
    focus: null,
  },
  reducers: {
    init: (state, action) => {
      init()
    },
    showTags: (state, action) => {
      const model = action.payload.model
      state.elementId = model.id
      state.tags = model.tags
      state.focus = model
    },
    addTag: (state, action) => {
      const tag = action.payload.tag
      const model = state.focus

      responseToTag(model, tag)

      state.focus.tags = [ ...state.tags, tag]
      state.tags = state.focus.tags
      
    },
    deleteTag: (state, action) => {
      let tags = state.focus.tags
      tags = tags.filter((e) => e !== action.payload.tag)
      state.focus.tags = tags
      state.tags = state.focus.tags
    }
  },
});

export const selectTaglib = (state) => state.taglib; // todo is respond to "name" in the slice
export const taglibActions = taglibSlice.actions;
export default taglibSlice.reducer;