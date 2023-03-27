import { createSlice } from "@reduxjs/toolkit";
import { addBlock, init, demo, setLabel, initPaperEvents, addPort, addSlot } from '../../diagramlib'
import { drawSections, layout, localLayout } from '../../diagramlib/layout';
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
		if (!state.sectionsAreDrawn){
			state.sectionsAreDrawn = true
		}
		localLayout(state.graph, state.selectedBlocks, state.section)
	},
	applyLocalLayout: (state, action) => {
		state.section = action.payload.section
		// localLayout(state.selectedBlocks, action.payload.section)
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
