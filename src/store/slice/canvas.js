import { createSlice } from "@reduxjs/toolkit";
import { addBlock, init, demo, initPaperEvents, blueBox, basicOperationDemo } from '../../diagramlib'
import { localLayout } from '../../diagramlib/layout';
import { initTagsLib } from "../../diagramlib/tag_engine";

export const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
	  paper: null,
	  graph: null,
	  init: false,
	  focus: null,
	  blocks: [], // for demo,
	  sectionsAreDrawn: false,
	  selectedBlocks: [],
	  section: null
  },
  reducers: {
	initPaper: (state, action) => {
		if (!state.init) {
			const { graph, paper } = init()
			state.graph = graph
			state.paper = paper
			initPaperEvents(paper, action.payload.dispatch)
			initTagsLib()
			// state.blocks = demo(state.graph, state.paper)
			state.init = true
		}
	},
	basicOperation: (state, action) => {
		state.blocks = basicOperationDemo(state.graph, state.paper)
	},
	blueBox: (state, action) => {
		state.blocks = blueBox(state.graph, state.paper)
	},
	addBlock: (state, action) => {
		addBlock(state.paper, state.graph)
	},
	applyLocalLayout: (state, action) => {
		localLayout(state.graph)
	},
	highlight: (state, action) => {
		state.selectedBlocks = [ ...state.selectedBlocks, action.payload.model ]
	},
	dehighlight: (state, action) => {
		state.selectedBlocks = 
			state.selectedBlocks.filter((e) => !(e.id === action.payload.model.id) )
	}
  },
});

export const selectCanvas = (state) => state.canvas; // It is respond to "name" in the slice
export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
