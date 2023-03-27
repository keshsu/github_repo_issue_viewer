import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";

const App: React.FC = () => {
  const [repoUrl, setrepoUrl] = useState<string>("");
  const [issues, setissues] = useState("");

  console.log(repoUrl);
  return (
    <div className="App">
      <header className="App-header">Giithub Repo Issues Viewer</header>
      <InputField repoUrl={repoUrl} setrepoUrl={setrepoUrl} />
    </div>
  );
};

export default App;
