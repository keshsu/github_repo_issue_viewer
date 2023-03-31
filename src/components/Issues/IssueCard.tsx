import React from "react";
import { Issue } from "../../models/issues";
import { Card } from "@mui/material";
import moment from "moment";
import { Draggable } from "react-beautiful-dnd";

type IssueCardProps = {
  index: number;
  issue: Issue;
};

const IssueCard: React.FC<IssueCardProps> = ({
  index,
  issue,
}: IssueCardProps) => {
  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          className={`issue-card ${snapshot.isDragging ? "drag" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h4>{issue.title}</h4>
          <small>{`#${issue.number} opened ${moment(
            issue.created_at
          ).fromNow()} by ${issue.user.login}`}</small>
        </Card>
      )}
    </Draggable>
  );
};

export default IssueCard;
