import React from "react";
import { Droppable } from "react-beautiful-dnd";
import IssueCard from "./IssueCard";
import "../Style.css";
import { Issue, IssuesStatus } from "../../models/issues";

interface IssueWrapperProps {
  backlogIssues: Issue[];
  setBacklogIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  activeIssues: Issue[];
  setActiveIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  completedIssues: Issue[];
  setCompletedIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}

const IssuesWrapper: React.FC<IssueWrapperProps> = ({
  backlogIssues,
  activeIssues,
  completedIssues,
}: IssueWrapperProps) => {
  return (
    <div className="issues-wrapper">
      <Droppable droppableId={IssuesStatus.BacklogIssues}>
        {(provided, snapshot) => (
          <div
            className={`backlog ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2>Backlog</h2>
            {backlogIssues.map((issue, index) => (
              <IssueCard index={index} key={index} issue={issue} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={IssuesStatus.ActiveIssues}>
        {(provided, snapshot) => (
          <div
            className={`in-progress  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2>In Progress</h2>
            {activeIssues.map((issue, index) => (
              <IssueCard index={index} key={index} issue={issue} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={IssuesStatus.CompletedIssues}>
        {(provided, snapshot) => (
          <div
            className={`completed  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2>Completed</h2>
            {completedIssues.map((issue, index) => (
              <IssueCard index={index} key={index} issue={issue} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default IssuesWrapper;
