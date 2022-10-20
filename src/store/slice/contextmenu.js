import { createSlice } from "@reduxjs/toolkit";
export const contextMenuSlice = createSlice({
  name: "contextmenu",
  initialState: {
	show: true,
	event: {pageX: 100, pageY: 100},
  },
  reducers: {
	toggle: (state, action) => {
		state.event = action.payload.event
		if (state.show) state.show = false
		else state.show = true

		// console.log(state.show)
	},
	disable: (state, action) => {
		state.event = action.payload.event
		state.show = false
	},
	showMenu: (state, action) => {
		action.payload.event.preventDefault()
		state.event = action.payload.event
		state.show = true
	}
  },
});

export const selectContextMenu = (state) => state.contextmenu; // todo is respond to "name" in the slice
export const contextMenuActions = contextMenuSlice.actions;
export default contextMenuSlice.reducer;