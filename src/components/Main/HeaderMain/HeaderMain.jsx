import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineGithub } from "react-icons/ai";
function HeaderMain(props) {
  const { projectDetail } = props;
  return (
    <div className="header">
      <div className="breadcumb">
        <NavLink to="/projectmanagement" exact className="breadcumb-text">
          Projects
        </NavLink>
        <span className="breadcumb-divide">/</span>
        <NavLink to="/projectmanagement" exact className="breadcumb-text">
          singularity 1.0
        </NavLink>
        <span className="breadcumb-divide">/</span>

        <NavLink
          to={`/projectDetail/${projectDetail.id}`}
          exact
          className="breadcumb-text"
        >
          Project Detail
        </NavLink>
        <span className="breadcumb-divide">/</span>
        <NavLink
          to={`/projectDetail/${projectDetail.id}`}
          exact
          className="breadcumb-text"
        >
          {projectDetail.projectName}
        </NavLink>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="component-title">Project Detail</h1>
        <a href="https://github.com/kaothong">
          <button className=" github-btn ">
            <div className="text-xl">
              <AiOutlineGithub />
            </div>
            <p className="pl-2">Github Repo</p>
          </button>
        </a>
      </div>
    </div>
  );
}

export default HeaderMain;
