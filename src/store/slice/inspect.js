import { createSlice } from "@reduxjs/toolkit";
import { modelToInfo } from '../../utils'

export const inspectSlice = createSlice({
  name: "inspect",
  initialState: {
	  id: '',
    label: '',
    role: '',
  },
  reducers: {
    showBlockInfo: (state, action) => {
      const info = modelToInfo(action.payload.model)
      Object.assign(state, info)
    }
  },
});

export const selectInspect = (state) => state.inspect; // It is respond to "name" in the slice
export const inspectActions = inspectSlice.actions;
export default inspectSlice.reducer;