import { createSlice } from "@reduxjs/toolkit";
import { addBlock, init, demo, setLabel, initPaperEvents, addPort, addSlot } from '../../diagramlib'
import { drawSections, idealLayout, layout } from '../../diagramlib/layout';

export const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
	  paper: null,
	  graph: null,
	  init: false,
	  focus: null,
	  blocks: new Array() // for demo
  },
  reducers: {
	initPaper: (state, action) => {
		if (!state.init) {
			const { graph, paper } = init()
			state.graph = graph
			state.paper = paper
			initPaperEvents(paper, action.payload.dispatch)
			state.blocks = demo(state.graph, state.paper)
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
	},
	setLayoutMap: (state, action) => {
		const gridOptions = action.payload
		drawSections(state.graph, gridOptions)

		// idealLayout(state.graph, state.paper, state.blocks, gridOptions)
		console.log(Array.isArray(state.blocks))
		layout(state.blocks, gridOptions)
	}
  },
});

export const selectCanvas = (state) => state.canvas; // It is respond to "name" in the slice
export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
