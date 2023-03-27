import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

interface Props {
  repoUrl: string;
  setrepoUrl: React.Dispatch<React.SetStateAction<string>>;
}
const InputField: React.FC<Props> = ({ repoUrl, setrepoUrl }: Props) => {
  const handleSubmit = () => {};

  return (
    <div className="inputField-wrapper">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Repo Url"
          variant="outlined"
          value={repoUrl}
          onChange={(e) => setrepoUrl(e.target.value)}
        />
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
