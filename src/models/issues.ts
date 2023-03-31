type User = {
  login: string;
};

export interface Issue {
  id: number;
  title: string;
  number: number;
  created_at: string;
  updated_at: string;
  status: Status;
  user: User;
}
export enum Status {
  Backlog,
  Active,
  Done,
}

export enum IssuesStatus {
  BacklogIssues = "BacklogIssues",
  ActiveIssues = "ActiveIssues",
  CompletedIssues = "CompletedIssuse",
}
