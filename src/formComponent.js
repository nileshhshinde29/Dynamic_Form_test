import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { margin } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {
  const [myObj, setMyObj] = React.useState({});
  const [myError, setError] = React.useState("");

  React.useEffect(() => {
    initialData();
  }, [props.displayData]);

  const checkboxFunction = (value, name) => {
    const myname = name;

    setMyObj({
      ...myObj,
      [name]: myObj[name]
        ? myObj[name].includes(value)
          ? myObj[name].filter((itm) => itm !== value)
          : [...myObj[name], value]
        : [value],
    }); // myObj.name?.includes(value) ? myObj.filter((it)=>!it) :
  };

  const radioFunction = (value, name) => {
    const myname = name;

    setMyObj({ ...myObj, [name]: value }); // myObj.name?.includes(value) ? myObj.filter((it)=>!it) :
  };
  const SelectFunction = (e, name) => {
    setMyObj({ ...myObj, [name]: e.target.value });
  };

  const SumitFunction = async () => {
    const data1 = props.displayData.filter((item, i) =>
      Array.isArray(myObj[item.name])
        ? item.required && myObj[item.name].length < 1
        : item.required && !myObj[item.name]
    );

    if (Object.keys(data1).length == 0) {
      setError("");
      console.log(myObj);
    } else setError("please fill required field");
  };
  const initialData = () => {
    props.displayData.map((itm, i) => {
      setMyObj({ ...myObj, [itm.name]: "" });
    });
  };

  //*******************************************************************
  const [formErrors, setformErrors] = React.useState({});
  let isSubmit = false;

  const data1 = props.displayData.filter((item, i) =>
    Array.isArray(myObj[item.name])
      ? item.required && myObj[item.name].length < 1
      : item.required && !myObj[item.name]
  );

  // function checkinKValidation(e, data) {

  //     e.preventDefault();

  //     isSubmit = true;

  //     const errors = {}
  //     // setformErrors(validate(data));

  //     if (Object.keys(errors).length == 0 && isSubmit) {
  //             //  setAllData([...allData, data]);
  //             //  setData({lable: "",
  //             //  fieldType: "",
  //             //  name: "",
  //             //  options: [],
  //             //  required:false
  //             // })
  //              isSubmit = false;
  //     };
  //   }

  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "30px",
        padding: "30px",
        border: "1px solid black",
      }}
    >
         <Grid container lg={12} spacing={2}>
      {props.displayData.map((items, index) => {
        const myname = items?.name;

        return (
          <>
           
              <Grid item lg={2} spacing={2}>
                <Typography>
                  {" "}
                  {items.lable}
                  {items.required ? (
                    <span style={{ color: "red" }}>*</span>
                  ) : (
                    ""
                  )}
                </Typography>
              </Grid>
              <Grid item lg={8}></Grid>
              {/* <br />
            <labal>{items.lable}</labal>
            <br /> */}
            
              <Grid item lg={8} spacing={2}>
                {items.fieldType == "text" && (
                  <TextField
                    onChange={(e) =>
                      setMyObj({ ...myObj, [items?.name]: e.target.value })
                    }
                    id="outlined-basic"
                    required={items.required}
                    value={myObj.myname}
                    label={items.lable}
                    variant="outlined"
                    sx={{ minWidth: 200 }}
                    // error={(items.required && !myObj[items.name])}
                    // helperText={formErrors.options}
                  />
                )}
              </Grid>
              <Grid item lg={8} spacing={2}>
                {items.fieldType == "textArea" && (
                  <TextareaAutosize
                    onChange={(e) =>
                      setMyObj({ ...myObj, [items?.name]: e.target.value })
                    }
                    value={myObj.myname}
                    aria-label="empty textarea"
                    placeholder="Empty"
                    // error={(items.required && !myObj[items.name])}
                    // sx={{ minWidth: 200 }}
                  />
                )}
              </Grid>

              <Grid item lg={8} spacing={2}>
                {items.fieldType == "checkbox" &&
                  items.options.map((itm, i) => (
                    <>
                      <Checkbox
                        value={itm}
                        checked={
                          myObj[items.name] && myObj[items.name].includes(itm)
                        }
                        onChange={() => checkboxFunction(itm, items.name)}
                      />
                      <lable>{itm}</lable>
                    </>
                  ))}
              </Grid>

              <Grid item lg={8} spacing={2}>
                {items.fieldType == "radio" &&
                  items.options.map((itm, i) => (
                    <>
                      <input
                        type="radio"
                        name={items.name}
                        checked={
                          myObj[items.name] && myObj[items.name].includes(itm)
                        }
                        onChange={() => radioFunction(itm, items.name)}
                      />
                      <lable>{itm}</lable>
                    </>
                  ))}
              </Grid>

              <Grid item lg={8} spacing={2}>
                {items.fieldType == "select" && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    lable={items.lable}
                    sx={{ minWidth: 200 }}
                    label="Age"
                    onChange={(e) => SelectFunction(e, items.name)}
                  >
                    {items.options.map((itm, i) => (
                      <MenuItem value={itm}>{itm}</MenuItem>
                    ))}
                  </Select>
                )}
              </Grid>
            
          </>
        );
      })}
      <Grid item lg={8}>
        <h6 style={{ color: "red" }}>{myError}</h6>
        <Button variant="contained" type="submit" onClick={() => SumitFunction()}>
        Submit
      </Button>
      </Grid>
      
      </Grid>
    </Box>
  );
}
