import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

const InputField = () => {
  return (
    <div className="inputField-wrapper">
      <form>
        <TextField label="Repo Url" variant="outlined" />
        <Button
          variant="contained"
          onClick={() => {
            alert("clicked");
          }}
        >
          Load Issues
        </Button>
      </form>
    </div>
  );
};

export default InputField;
