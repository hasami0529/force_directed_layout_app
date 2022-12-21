import { createSlice } from "@reduxjs/toolkit";
import { addBlock, init, demo, setLabel, initPaperEvents, addPort, addSlot } from '../../diagramlib'

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
			initPaperEvents(paper, action.payload.dispatch)
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
	},
	addPort: (state, action) => {
		const { target, direction } = action.payload
		addPort(target, direction)
	},
	addSlot: (state, action) => {
		const { target, direction } = action.payload
		addSlot(target, direction)
	}
  },
});

export const selectCanvas = (state) => state.canvas; // It is respond to "name" in the slice
export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
