import { createSlice } from "@reduxjs/toolkit";
import { fake3Tag } from '../../utils'
import axios from 'axios';

async function getTags(state, action) {
  const baseURL = 'http://127.0.0.1:5000'
  let data;
  await axios({
    method: 'get',
    url: '/tags',
    baseURL: baseURL,
    responseType: 'json',
    headers: {
      'Acess-Controll-Allow-Origin': "*"
    },
  })
  .then(function (response) {
      data = response.data
      return response.data
    })

  console.log(data)
  state.tags = data
  console.log(state.tags)
}

export const taglibSlice = createSlice({
  name: "taglib",
  initialState: {
	  elementId: '',
    tags: [],
    elements: []
  },
  reducers: {
    showTag: getTags,
    renderElements: (state, action) => {
      state.elements = action.payload.elements
  }
  },
});

export const selectTaglib = (state) => state.taglib; // todo is respond to "name" in the slice
export const taglibActions = taglibSlice.actions;
export default taglibSlice.reducer;