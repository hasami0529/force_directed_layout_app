import TextField from '@mui/material/TextField';

import { selectInspect } from '../store/slice/inspect'
import { selectCanvas, canvasActions } from '../store/slice/canvas';
import { useSelector, useDispatch } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';



import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

import { GRID, PAPERHIEGHT, PAPERWIDTH } from '../diagramlib/config';



const EDITABLE = ['label']

function createData(states) {
  let info = Object.entries(states)
  const n = info.map(row => {
    const o = { header: row[0], value: row[1]}
    if (EDITABLE.includes(row[0])) {
      return { ...o, editable: true}
    } else {
      return o
    }
  })

  // console.log(n)
  return n
}

function handleOnChange(e, dispatch) {
  // console.log(e)
  dispatch(
    canvasActions.changeLabel({ label: e.target.value })
  )
}

function editMode() {
  console.log('edit')
}

function EditableField(props) {
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()

  if (editing) {
    return (
      <TextField
        autoFocus="true"
        onBlur={() => setEditing(false)}
        onChange={(e) => { handleOnChange(e, dispatch); props.row.value = e.target.value }}
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        size="small"
        defaultValue={props.row.value}
      ></TextField>
    )
  } else {
    return (
      <div>
        { props.row.value }
        { props.row.editable? <EditIcon type='button' onClick={() => setEditing(true)} fontSize='small'></EditIcon>: null }
      </div>
    )
  }

}

function GridSlider(props) {
  return (
    <div>
      <Typography id="input-slider" gutterBottom>
        {props.title}
      </Typography>
        <Input
          width="42px"
          value={props.gridOptions[props.title]}
          size="small"
          onChange={(e) => { props.handleInputChange(e, props.title)}}
          // onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: props.min,
            max: props.max,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
          ></Input>
    </div>
  )
}

function Layout() {
  const [gridOptions, setGirdOptions] = useState({
    a: GRID.a,
    b: GRID.b,
    c: GRID.c,
    d: GRID.d
  });

  const dispatch = useDispatch()

  const handleInputChange = (event, target) => {
    let v = { ...gridOptions }
    v[target] = event.target.value === '' ? v[target] : Number(event.target.value)
    setGirdOptions(v);
  };

  // const handleBlur = () => {
  //   if (value < 0) {
  //     setValue(0);
  //   } else if (value > 100) {
  //     setValue(100);
  //   }
  // };

  return (
    <Box sx={{ width: 250 }}>
      <GridSlider title="a" min={50} max={PAPERWIDTH-50} gridOptions={gridOptions} handleInputChange={handleInputChange}></GridSlider>
      <GridSlider title="b" min={50} max={PAPERWIDTH-50} gridOptions={gridOptions} handleInputChange={handleInputChange}></GridSlider>
      <GridSlider title="c" min={50} max={PAPERHIEGHT-50} gridOptions={gridOptions} handleInputChange={handleInputChange}></GridSlider>
      <GridSlider title="d" min={50} max={PAPERHIEGHT-50} gridOptions={gridOptions} handleInputChange={handleInputChange}></GridSlider>
      <Button variant="outlined" onClick={() => {dispatch(canvasActions.setLayoutMap(gridOptions))}}>Apply</Button>
    </Box>





  )
}

function InfoTable(){

  const states = useSelector(selectInspect)
  return (
    <TableContainer component={Paper}>
    <Table  aria-label="simple table">
      <TableBody>
        {createData(states).map((row) => (
          <TableRow
            key={row.header}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <b>{row.header}:</b>
            </TableCell>
            <TableCell ><EditableField row={row}></EditableField></TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  )
}

export function Inspect() {
  return(
    <div class='inspection'>
      <Accordion defaultExpanded="true">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>General</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InfoTable></InfoTable>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded="true">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Layout</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Layout></Layout>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Style</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            coming soon...
          </Typography>
        </AccordionDetails>
      </Accordion>
  </div>
  )
}
