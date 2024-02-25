import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as yup from "yup";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const movieValidationSchema = yup.object({
  actors: yup
    .array()
    .nullable()
    .test(
      "atLeastOneActor",
      "Please select at least one actor",
      function (value) {
        return value && value.length > 0;
      }
    ),
});

export default function Dummy() {
  const theme = useTheme();

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        actors: [],
      },
      validationSchema: movieValidationSchema,
      onSubmit: (newmovie) => {
        console.log("onsubmit", newmovie);
      },
    });

    const handleChangeActors = (event) => {
        const {
          target: { value },
        } = event;
        
        // Use handleChange from useFormik to update form values
        handleChange("actors")({ target: { value } });
      };
      

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          name="actors"
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={values.actors} 
          onChange={handleChangeActors}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          onBlur={handleBlur}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, values.actors, theme)}  
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        {touched.actors && errors.actors && (
          <div style={{ color: "red" }}>{errors.actors}</div>
        )}
      </FormControl>
    </div>
  );
}
