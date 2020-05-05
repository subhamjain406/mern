import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const ProfileGit = (props) => {
  const [state, setState] = useState({
    clientId: "d33632c4500cd3dfa66c",
    clientSecret: "6f3198a70a093c77a9781db6b4a594af403245e9",
    count: 6,
    sort: "created: asc",
    repos: [],
  });

  const myRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const { username } = props;
      const { count, sort, clientId, clientSecret } = state;

      fetch(
        `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (myRef) {
            setState({
              ...state,
              repos: data,
            });
          }
        })
        .catch((err) => console.log(err));
    }, 1);
  }, []);

  const { repos } = state;
  const repoItems = repos.map((repo) => (
    <div key={repo.id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <Link to={repo.html_url} className="text-info" target="_blank">
              {repo.name}
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">Forks: {repo.forks_count}</span>
        </div>
      </div>
    </div>
  ));
  return (
    <div ref={myRef}>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  );
};

ProfileGit.propTypes = {
  username: propTypes.string.isRequired,
};

export default ProfileGit;
