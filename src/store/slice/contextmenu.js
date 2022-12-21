import { createSlice } from "@reduxjs/toolkit";
export const contextMenuSlice = createSlice({
  name: "contextmenu",
  initialState: {
	show: false,
	event: {pageX: 100, pageY: 100},
	menu: 'default',
	target: null,
	expandedCoord: {
		display: false,
		x: 100,
		y: 100
	}
  },
  reducers: {
	toggle: (state, action) => {
		state.event = action.payload.event
		if (state.show) state.show = false
		else state.show = true
	},
	disable: (state, action) => {
		state.event = action.payload.event
		state.show = false
		state.expandedCoord.display = false
	},
	showMenu: (state, action) => {
		state.event = action.payload.event
		state.show = true
		state.expandedCoord.display = false
		state.menu = 'paper'
	},
	showBlockMenu: (state, action) => {
		const { evt, target } = action.payload
		evt.preventDefault()
		state.event = evt
		state.show = true
		state.expandedCoord.display = false
		state.menu = 'block'
		state.target = target.model
	},
	setExpandedCoord: (state, action) => {
		state.expandedCoord = action.payload
	},
	showBusMenu: (state, action) => {
		const { evt, target } = action.payload
		evt.preventDefault()
		state.event = evt
		state.show = true
		state.expandedCoord.display = false
		state.menu = 'bus'
		state.target = target.model
	},
  },
});

export const selectContextMenu = (state) => state.contextmenu; // todo is respond to "name" in the slice
export const contextMenuActions = contextMenuSlice.actions;
export default contextMenuSlice.reducer;