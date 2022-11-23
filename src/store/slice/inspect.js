import { createSlice } from "@reduxjs/toolkit";
import { dia } from 'jointjs'

// utils to get model info
function getLabel(model) {
  if (model instanceof dia.Element){
    return model.attributes.attrs.label.text
  }
}

function modelToInfo(model) {
  if (model instanceof dia.Element){
    console.log(model)
    return {
      id: model.id,
      role: model.role,
      label: getLabel(model)
    }
  }

}

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