import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import "./style.css";
import { OPEN_FORM_ADD_TASK } from "utils/Constants/constants";
import FormAddTask from "components/Forms/FormAddTask/FormAddTask";
import { useDispatch } from "react-redux";

function Sidebar() {
  const dispatch = useDispatch();
  const handleAddTask = () => {
    const action = {
      type: OPEN_FORM_ADD_TASK,
      title: "Add Task",
      Component: <FormAddTask />,
    };
    dispatch(action);
  };
  return (
    <div className="sidebar">
      <aside className="sidebar-container">
        <NavLink to="/" className="block  logo-container mt-4 mb-2">
          <div className="logo-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 75.76 75.76"
              width={28}
            >
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="34.64"
                  y1="15.35"
                  x2={19}
                  y2="30.99"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.18" stopColor="rgba(0, 82, 204, 0.2)" />
                  <stop offset={1} stopColor="#DEEBFE" />
                </linearGradient>
                <linearGradient
                  id="linear-gradient-2"
                  x1="38.78"
                  y1="60.28"
                  x2="54.39"
                  y2="44.67"
                  xlinkHref="#linear-gradient"
                />
              </defs>
              <title>Jira Software-blue</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Blue">
                  <path
                    d="M72.4,35.76,39.8,3.16,36.64,0h0L12.1,24.54h0L.88,35.76A3,3,0,0,0,.88,40L23.3,62.42,36.64,75.76,61.18,51.22l.38-.38L72.4,40A3,3,0,0,0,72.4,35.76ZM36.64,49.08l-11.2-11.2,11.2-11.2,11.2,11.2Z"
                    style={{ fill: "rgb(222, 235, 254)" }}
                  />
                  <path
                    d="M36.64,26.68A18.86,18.86,0,0,1,36.56.09L12.05,24.59,25.39,37.93,36.64,26.68Z"
                    style={{
                      fill: 'url("#linear-gradient")',
                    }}
                  />
                  <path
                    d="M47.87,37.85,36.64,49.08a18.86,18.86,0,0,1,0,26.68h0L61.21,51.19Z"
                    style={{
                      fill: 'url("#linear-gradient-2")',
                    }}
                  />
                </g>
              </g>
            </svg>
          </div>
        </NavLink>
        <div className="sidebar-item flex items-center ">
          <div className="sidebar-icon inline-block">
            <FiSearch className="font-bold" />
          </div>
          <p className="text-xs font-bold inline-block ">SEARCH ISSUES</p>
        </div>
        <div
          className="sidebar-item flex items-center "
          onClick={handleAddTask}
        >
          <div className="sidebar-icon inline-block">
            <HiPlus className="font-bold" />
          </div>
          <p className="text-xs font-bold inline-block ">CREATE TASK</p>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
