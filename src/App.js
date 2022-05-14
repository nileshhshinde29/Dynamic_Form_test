import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormBuider from "./FormBuider"
import FormComponent from "./formComponent"
import { useState } from 'react';

function App() {
  const [ displayData, setDisplayData ] =useState([])
  console.log(displayData)
  return (
    <div className="App">
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
         <FormBuider setDisplayData={setDisplayData} />
        </Grid>
        <Grid item xs={6}>
          <FormComponent displayData={displayData}/>
        </Grid>
       
      </Grid>
    </Box>
    </div>
  );
}

export default App;
