import { Breadcrumbs, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { listIssues } from "./apis";
import InputField from "./components/InputField";
import IssuesWrapper from "./components/Issues/IssuesWrapper";
import { Issue, IssuesStatus } from "./models/issues";
import { RepoDetails } from "./models/repoInfo";
import "./App.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [repoUrl, setrepoUrl] = useState<string>("");
  const [searching, setsearching] = useState<boolean>(false);
  const [repoDetails, setrepoDetails] = useState<RepoDetails>();
  const [backlogIssues, setBacklogIssues] = useState<Issue[]>([]);
  const [activeIssues, setActiveIssues] = useState<Issue[]>([]);
  const [completedIssues, setCompletedIssues] = useState<Issue[]>([]);
  const [issues, setissues] = useState<Issue[]>([]);
  const [inProgressIssue, setinProgressIssue] = useState<Issue[]>([]);
  const [completedIssue, setcompletedIssue] = useState<Issue[]>([]);

  useEffect(() => {
    let backlogIssues = window.localStorage.getItem("backlogIssues");
    if (backlogIssues) {
      let parsed = JSON.parse(backlogIssues);
      setBacklogIssues(parsed);
    }

    let activeIssues = window.localStorage.getItem("activeIssues");
    if (activeIssues) {
      let parsed = JSON.parse(activeIssues);
      setActiveIssues(parsed);
    }
    let completedIssues = window.localStorage.getItem("completedIssues");
    if (completedIssues) {
      let parsed = JSON.parse(completedIssues);
      setCompletedIssues(parsed);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setsearching(!searching);

    if (!repoUrl) return null;

    const match = repoUrl.match(
      /^https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/
    );

    if (!match || !(match.groups?.owner && match.groups?.name)) return null;

    return setrepoDetails({
      owner: match.groups.owner,
      repo: match.groups.name,
    });
  };

  const onDragEndHandler = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return null;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      backlog = backlogIssues,
      active = activeIssues,
      complete = completedIssues;

    switch (source.droppableId) {
      case IssuesStatus.BacklogIssues:
        add = backlogIssues[source.index];
        backlog.splice(source.index, 1);
        break;
      case IssuesStatus.ActiveIssues:
        add = active[source.index];
        active.splice(source.index, 1);
        break;
      case IssuesStatus.CompletedIssues:
        add = complete[source.index];
        complete.splice(source.index, 1);
        break;
    }

    if (add) {
      switch (destination.droppableId) {
        case IssuesStatus.BacklogIssues:
          backlog.splice(destination.index, 0, add);
          break;
        case IssuesStatus.ActiveIssues:
          active.splice(destination.index, 0, add);
          break;
        case IssuesStatus.CompletedIssues:
          complete.splice(destination.index, 0, add);
          break;
      }
    }

    setBacklogIssues(backlog);
    setActiveIssues(active);
    setCompletedIssues(complete);

    if (window) {
      window.localStorage.setItem("backlogIssues", JSON.stringify(backlog));
      window.localStorage.setItem("activeIssues", JSON.stringify(active));
      window.localStorage.setItem("completedIssues", JSON.stringify(complete));
    }
  };

  useEffect(() => {
    if (repoDetails) {
      listIssues({ owner: repoDetails.owner, repo: repoDetails.repo }).then(
        (res) => {
          setBacklogIssues(res.data);
        }
      );
    }
  }, [searching, repoDetails]);

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <div className="App">
        <header className="App-header">Giithub Repo Issues Viewer</header>
        <main className="main-wrapper">
          <InputField
            repoUrl={repoUrl}
            setrepoUrl={setrepoUrl}
            handleSubmit={handleSubmit}
          />
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="#"
              className="breadcrumb-link"
            >
              {repoDetails?.owner}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
              className="breadcrumb-link"
            >
              {repoDetails?.repo}
            </Link>
          </Breadcrumbs>
          <IssuesWrapper
            backlogIssues={backlogIssues}
            setBacklogIssues={setBacklogIssues}
            activeIssues={activeIssues}
            setActiveIssues={setActiveIssues}
            completedIssues={completedIssues}
            setCompletedIssues={setCompletedIssues}
          />
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;
