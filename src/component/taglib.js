import React, { useState } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { selectTaglib, taglibActions } from "../store/slice/taglib";

// for tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TagIcon from '@mui/icons-material/Tag';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

// for tag list 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function Tags(props) {
  const states = useSelector(selectTaglib);


let tags = []
  if (states.focus) {
      states.tags.forEach( tag => {
        tags.push(<Tag tag={tag}></Tag>)
      })
      return(
        <List dense={true}>{tags}</List>
      )
  }
}



function Tag(props) {
  const dispatch = useDispatch()

  function deleteTag(e) {
    const tag = e.target.value
    console.log(e)
    dispatch(
      taglibActions.deleteTag({ tag: props.tag })
    )
  }
  
  return (
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={deleteTag}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemIcon>
          <TagIcon />
        </ListItemIcon>
        <ListItemText
          primary={props.tag}
        />
      </ListItem>
  )
}

function TagInputFeild() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  function handleChangeText(value) {
    setText(value.target.value)
  }

  function handleAddTag() {
    if (text === '')  return
    dispatch(
      taglibActions.addTag({ tag: text })
    )
  }

  return(
    <Stack direction="row" space={2}>
      <ListItemIcon>
        <TagIcon />
      </ListItemIcon>
      <Input defaultValue="add new tag" inputProps={''} onChange={handleChangeText} />
      <IconButton onClick={handleAddTag}>
        <AddCircleIcon></AddCircleIcon>
      </IconButton>
    </Stack>
  )
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export function Taglib() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{  bgcolor: 'background.paper', display: 'flex', height: "100%" }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab icon={<TagIcon />} aria-label="tag" label="Tag" {...a11yProps(0)} />
        <Tab icon={<AccountTreeOutlinedIcon />} aria-label="tree" label="tree" {...a11yProps(1)} />
      </Tabs>

      <Stack space={2}>

        <TagInputFeild></TagInputFeild>
        <Tags value={value} index={0}></Tags>

      </Stack>




    </Box>
  );
}

