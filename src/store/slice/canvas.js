import { createSlice } from "@reduxjs/toolkit";
import { addBlock, init, demo, setLabel } from '../../diagramlib'

export const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
	  paper: null,
	  graph: null,
	  init: false,
	  focus: null,
  },
  reducers: {
	initPaper: (state, action) => {
		if (!state.init) {
			const { graph, paper } = init()
			state.graph = graph
			state.paper = paper
			demo(state.graph, state.paper)
			state.init = true
		}
	},
	addBlock: (state, action) => {
		addBlock(state.paper, state.graph)
	},
	changeLabel: (state, action) => {
		if (state.focus) {
			setLabel(state.focus, action.payload.label)
		}
	},
	setFocus: (state, action) => {
		state.focus = action.payload.model
	}
  },
});

export const selectCanvas = (state) => state.canvas; // It is respond to "name" in the slice
export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
