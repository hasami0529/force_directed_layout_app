import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const showTags = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const baseURL = 'http://127.0.0.1:5000'
    const response = await fetch(baseURL + "/tags", {
      method: 'get',
      headers: {
        'Acess-Controll-Allow-Origin': "*"
      },
    })
    return response.json()
  }
)

export const taglibSlice = createSlice({
  name: "taglib",
  initialState: {
	  elementId: '',
    tags: [],
    elements: []
  },
  reducers: {
    renderElements: (state, action) => {
      state.elements = action.payload.elements
    },
  },
  extraReducers: {
    [showTags.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.tags = action.payload
    },
  }
});

export const selectTaglib = (state) => state.taglib; // todo is respond to "name" in the slice
export const taglibActions = taglibSlice.actions;
export default taglibSlice.reducer;