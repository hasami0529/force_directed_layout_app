import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTaglib, taglibActions } from "../store/slice/taglib";
import CheckboxTree from 'react-checkbox-tree';

// for tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TagIcon from '@mui/icons-material/Tag';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

function Tags(props) {
  const { value, index,  } = props;
  const states = useSelector(selectTaglib);
  const dispatch = useDispatch()

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
        <CheckboxTree
                nodes={states.tags['allTags']}
                checked={states.tags['checked']}
                expanded={states.tags['expanded']}
                onCheck={ (checked, target) => dispatch(taglibActions.check(checked)) }
                onExpand={ (expanded, target) => { dispatch(taglibActions.expand(expanded))}}
                noCascade={true}
                showExpandAll={true}
            />

    </div>
  );
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

