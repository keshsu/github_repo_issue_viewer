import axios from "axios";

interface Props {
  query: string;
  page?: number;
  per_page?: number;
  sort?: string;
  order?: string;
}

interface IssueProps {
  owner: string;
  repo: string;
}

export const searchRepo = (searchParams: Props) => {
  return axios
    .get(
      `https://api.github.com/search/repositories?q=${searchParams.query}&page=${searchParams.page}&per_page=${searchParams.per_page}&sort=${searchParams.sort}&order=${searchParams.order})`
    )
    .then((res) => {
      return res;
    });
};

export const listIssues = (Issue: IssueProps) => {
  return axios
    .get(`https://api.github.com/repos/${Issue.owner}/${Issue.repo}/issues`)
    .then((res) => {
      return res;
    });
};
