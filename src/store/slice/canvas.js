import { createSlice } from "@reduxjs/toolkit";
export const canvasSlice = createSlice({
  name: "canvas",
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
  },
});

export const selectCanvas = (state) => state.canvas; // todo is respond to "name" in the slice
export const CanvasActions = canvasSlice.actions;
export default canvasSlice.reducer;