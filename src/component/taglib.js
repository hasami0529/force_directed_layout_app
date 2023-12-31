import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTaglib } from "../store/slice/taglib";
import { selectCanvas } from "../store/slice/canvas";

// for tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TagIcon from '@mui/icons-material/Tag';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

// for Tree View
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function TabPanel(props) {
  const { value, index,  } = props;
  const states = useSelector(selectTaglib);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      <Box sx ={{ padding: "15px", width: "100%"}}>
        {/* {console.log(states.tags)} */}
        {states.tags.map((i) => (
          <div class='form-check' type="checkbox" value="" >      
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
            <label class="form-check-label" for="flexCheckDefault">
              {i}
            </label>
          </div>
        ))}
      </Box>
    </div>
  );
}

function BlockGraph() {
  const states = useSelector(selectTaglib);
  return (
    <TabPanel >
    coming soon
      <TreeItem nodeId="1" label="Blocks">
        { console.log(states.elements)}
        { states.elements.map(
          (el) => {
            if (el.role === 'Block')
              return (
                <TreeItem label={el.attributes.attrs.label.text} />
              )
            }
          )
        }
      </TreeItem>
    </TabPanel>
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

      <TabPanel value={value} index={0}>
      </TabPanel>

      {/* <BlockGraph></BlockGraph> */}
    </Box>
  );
}

