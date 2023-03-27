import React, { useEffect, useState } from "react";
import { listIssues, searchRepo } from "./apis";
import "./App.css";
import InputField from "./components/InputField";
import { Issue } from "./issues";

interface RepoDetails {
  owner: string;
  repo: string;
}

const App: React.FC = () => {
  const [repoUrl, setrepoUrl] = useState<string>("");
  const [setSearch, setsetSearch] = useState<boolean>(false);
  const [repoDetails, setrepoDetails] = useState<RepoDetails>();
  const [issues, setissues] = useState<Issue[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setsetSearch(!setSearch);
    searchRepo({ query: repoUrl }).then((res) => {
      console.log(res.data);
      setrepoDetails({
        owner: res.data.items[0].owner,
        repo: res.data.items[0].repo,
      });
    });
  };

  useEffect(() => {
    if (repoDetails) {
      console.log(repoDetails);
      listIssues({ owner: repoDetails.owner, repo: repoDetails.repo }).then(
        (res) => setissues(res.data.items)
      );
    }
  }, [setSearch, repoDetails]);

  return (
    <div className="App">
      <header className="App-header">Giithub Repo Issues Viewer</header>
      <InputField
        repoUrl={repoUrl}
        setrepoUrl={setrepoUrl}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
