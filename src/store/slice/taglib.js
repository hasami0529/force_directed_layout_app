import { createSlice } from "@reduxjs/toolkit";


function fake3Tag(id) {
    var l = []
    for (var i=1; i < 4; i++) {
        l.push({ content: `${id}'s fake tag ${i}`} )
    }
    return l
}


export const taglibSlice = createSlice({
  name: "taglib",
  initialState: {
	elementId: '',
    tags: []
  },
  reducers: {
	showTag: (state, action) => {
		state.elementId = action.payload.elementId
        state.tags = fake3Tag(action.payload.elementId)
	},
  },
});

export const selectTaglib = (state) => state.taglib; // todo is respond to "name" in the slice
export const taglibActions = taglibSlice.actions;
export default taglibSlice.reducer;