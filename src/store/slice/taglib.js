import { createSlice } from "@reduxjs/toolkit";
import tags from './tags.json'

function toCheckbox(tag_name, config) {
  return (
    {
      value: tag_name, // space_case
      label: tag_name, // snake_case,
      icon: null,
      ...config
    }
  )
}

function build(tag) {
  if (tag.taggable === undefined) tag.taggable = true
  if (tag.children) {
    let c = []
    tag.children.forEach( e => {
      c.push(build(e))
    })
    return { ...toCheckbox(tag.name, { showCheckbox: tag.taggable }), children: c}
  } else {
    return toCheckbox(tag.name, { showCheckbox: tag.taggable })
  }
}

function get_all_tags() {
  let nodes = []

  tags['tags'].forEach(element => {
      nodes.push(build(element))
  })
  console.log(nodes)

  return nodes
} 

export const taglibSlice = createSlice({
  name: "taglib",
  initialState: {
	  elementId: '',
    tags: {
      allTags: [],
      checked: [],
      expanded: [],
      focus: null
    },
    elements: []
  },
  reducers: {
    renderElements: (state, action) => {
      state.elements = action.payload.elements
    },
    showTags: (state, action) => {
      state.focus = action.payload.model
    },
    check: (state, action) => {
      state.tags['checked'] = action.payload
    },
    expand: (state, action) => {
      console.log(action.payload)
      state.tags['expanded'] = action.payload
    }
  },
});

export const selectTaglib = (state) => state.taglib; // todo is respond to "name" in the slice
export const taglibActions = taglibSlice.actions;
export default taglibSlice.reducer;