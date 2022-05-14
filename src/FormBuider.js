import * as React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Checkbox } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {
  const [allData, setAllData] = React.useState([]);
  const [opt, setOpt]=React.useState('')
  const [data, setData] = React.useState({
    lable: "",
    fieldType: "",
    name: "",
    options: [],
    required:false
  });
  React.useEffect(() => {

    props.setDisplayData(allData);

  }, [allData]);

//   const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setData({ ...data, fieldType: event.target.value });
  };

  const HandleOptions = (e) => {
      setOpt(e.target.value)
    const array = e.target.value.split(",");
    
    setData({ ...data, options: array });
  };

//*******************************************************************
const [formErrors, setformErrors] =React.useState({});
  let isSubmit = false;

function checkinKValidation(e, data) {
    e.preventDefault();
    console.log('hello')
    

    isSubmit = true;

    const errors = validate(data);
    setformErrors(validate(data));

    if (Object.keys(errors).length == 0 && isSubmit) {
             setAllData([...allData, data]);
             setData({lable: "",
             fieldType: "",
             name: "",
             options: [],
             required:false
            })
             isSubmit = false;
    }; setOpt('')
  }
console.log(formErrors)

  const validate = (values) => {
    const errors = {};
    console.log(values)
    
    const space = /^\S/
    const spacialCharacter= /^[a-zA-Z0-9!\$\^\&*\)\(+=._-]+$/g  ///^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
  
   
    
    
    if(spacialCharacter.test(values.name)===false)
    {
        errors.name= "spacial characters and space are not allowded"
    }
    if (space.test(values.name) === false)
    {
        errors.name="space not allowed"
    }
    if (!values.name) {
        errors.name = "name is required";
      }
    if( values.fieldType=="checkbox" && values.options.length<1)
    {
        errors.options="options are required"
    }
    if( values.fieldType=="radio" && values.options.length<1)
    {
        errors.options="options are required"
    }
    if( values.fieldType=="select" && values.options.length<1)
    {
        errors.options="options are required"
    }
    return errors;
    
  };
  
  














  return (
    <Box sx={{ flexGrow: 1, marginTop: "10px",border:"1px solid" ,padding:"30px" }}>
              <h3>Add Field</h3>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setData({ ...data, lable: e.target.value })}
            id="outlined-basic"
            label="lable"
            value={data.lable}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ minWidth: 235 }}>
              <InputLabel id="demo-simple-select-label">Field type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.fieldType}
                label="Lable"
                placeholder="Fieldtype"
                onChange={handleChange}
              >
                <MenuItem value={"text"}>text</MenuItem>
                <MenuItem value={"textArea"}>Textarea</MenuItem>
                <MenuItem value={"select"}>Select</MenuItem>
                <MenuItem value={"checkbox"}>Checkbox</MenuItem>v
                <MenuItem value={"radio"}>radio</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
            id="outlined-basic"
            label="Name"
            // value={data.name}
            variant="outlined"
            error={formErrors.name && true}
                helperText={formErrors.name}
          />
        </Grid>


        <Grid item xs={12}>
          <TextField
            // onChange={(e)=>setData({...data,})}

            id="outlined-basic"
            value={opt}
            onChange={(e) => HandleOptions(e)}
            label="options"
            variant="outlined"
            error={formErrors.options && true}
            helperText={formErrors.options}
          />
        </Grid>

        <Grid item xs={12}>
          <label><Checkbox  checked={data.required} onChange={()=>setData({...data, required:!data.required})} /> Required</label>
        </Grid>
        <Grid item xs={12}>
          <Button 
           
            onClick={(e) => {
            //   setAllData([...allData, data]);
            checkinKValidation(e,data);
              props.setDisplayData(allData);
            }}
          >
            {" "}
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
