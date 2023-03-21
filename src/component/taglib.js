import React from "react";
import { useSelector, useDispatch } from "react-redux";
import taglib, { selectTaglib, taglibActions } from "../store/slice/taglib";
import CheckboxTree from 'react-checkbox-tree';

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


function Tags(props) {
  const states = useSelector(selectTaglib);

let tags = []
  if (states.focus) {
      states.focus.tags.forEach( tag => {
        tags.push(<Tag tag={tag}></Tag>)
      })
      return(
        <List dense={true}>{tags}</List>
      )
  }
}

function Tag(props) {
  return (
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
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

      <Tags value={value} index={0}></Tags>

    </Box>
  );
}

