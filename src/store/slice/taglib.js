import { createSlice } from "@reduxjs/toolkit";
import { fake3Tag } from '../../utils'

export const taglibSlice = createSlice({
  name: "taglib",
  initialState: {
	elementId: '',
    tags: [],
    elements: []
  },
  reducers: {
	showTag: (state, action) => {
		state.elementId = action.payload.elementId
        state.tags = fake3Tag(action.payload.elementId)
	},
  renderElements: (state, action) => {
    state.elements = action.payload.elements
  }
  },
});

export const selectTaglib = (state) => state.taglib; // todo is respond to "name" in the slice
export const taglibActions = taglibSlice.actions;
export default taglibSlice.reducer;