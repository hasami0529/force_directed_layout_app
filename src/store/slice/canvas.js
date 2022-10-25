import { createSlice } from "@reduxjs/toolkit";
import { addBlock, init, demo } from '../../diagramlib'
export const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
	  paper: null,
	  graph: null,
	  init: false
  },
  reducers: {
	initPaper: (state, action) => {

		if (!state.init) {
			const { graph, paper } = init()
			state.graph = graph
			state.paper = paper
			state.init = true
		}
	},
	addBlock: (state, action) => {
		addBlock(state.graph)
	},
	demo: (state, action) => {
		demo(state.graph)
	}
  },
});

export const selectCanvas = (state) => state.canvas; // It is respond to "name" in the slice
export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
