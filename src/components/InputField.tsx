import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

interface Props {
  repoUrl: string;
  setrepoUrl: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({
  repoUrl,
  setrepoUrl,
  handleSubmit,
}: Props) => {
  return (
    <div className="inputField-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          fullWidth
          label="Repo Url"
          variant="outlined"
          value={repoUrl}
          onChange={(e) => setrepoUrl(e.target.value)}
          required
        />
        <Button variant="contained" type="submit" className="load-button">
          Load Issues
        </Button>
      </form>
    </div>
  );
};

export default InputField;
