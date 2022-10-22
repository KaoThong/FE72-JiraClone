import {
  Table,
  Space,
  Button,
  Tag,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import { AiFillEdit, AiFillDelete, AiFillCloseSquare } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
// import {FaUserMinus} from 'react-icons/fa';
import React, { Fragment, useState } from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignUserProjectAction,
  deleteProjectAction,
  removeUserFromProjectAction,
  setProjectListAction,
} from "redux/actions/projectActions";
import {
  EDIT_PROJECT,
  OPEN_FORM_EDIT_PROJECT,
} from "redux/actions/drawerModalActions";
import FormEditProject from "components/Forms/FormEditProject/FormEditProject";
import { NavLink } from "react-router-dom";
import { getAllCategoryAction } from "redux/actions/editActions";
import { getUserAction } from "redux/actions/userAction";
// import MembersTable from "components/MembersTable/MembersTable";
import { useRef } from "react";
const { Group } = Avatar;
function ProjectManagement() {
  const dispatch = useDispatch();

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [value, setValue] = useState("");
  const searchRef = useRef(null);
  const projectList = useSelector((state) => state.project.projectList);
  const userList = useSelector((state) => state.user.userList);
  const data = projectList;
  useEffect(() => {
    dispatch(setProjectListAction);
    dispatch(getAllCategoryAction);
  }, []);
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  // hàm xử lí filter FORM
  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  // hàm POPCONFIRM ANTD
  const confirm = (e) => {
    console.log(e, "ProjectId");
    dispatch(deleteProjectAction(e, dispatch));
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const handleProjectEdit = (record) => {
    const action = {
      type: OPEN_FORM_EDIT_PROJECT,
      title: "Edit Project",
      Component: <FormEditProject />,
    };
    // dispatch dữ liệu dòng hiện tại
    const actionEditProject = {
      type: EDIT_PROJECT,
      payload: record,
    };
    dispatch(action);
    dispatch(actionEditProject);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => item2.id - item1.id,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`projectDetail/${record.id}`}>{text}</NavLink>;
      },
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Creator",
      key: "categoryName",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            <Group maxCount={3}>
              <Popover
                placement="top"
                title="Add user:"
                content={() => {
                  return (
                    <AutoComplete
                      className="w-full"
                      value={value}
                      onSearch={(value) => {
                        if (searchRef !== null) {
                          clearTimeout(searchRef.current);
                        }
                        searchRef.current = setTimeout(() => {
                          dispatch(getUserAction(value));
                        }, 300);
                      }}
                      options={userList?.map((user) => ({
                        label: user.name,
                        value: user.userId,
                      }))}
                      onSelect={(value, option) => {
                        // valuue là userId, label mới là userName
                        setValue(option.label);

                        // gọi API gửi về backend
                        dispatch(
                          assignUserProjectAction(
                            {
                              projectId: record.id,
                              userId: option.value,
                            },
                            dispatch
                          )
                        );
                      }}
                      onChange={(value) => {
                        setValue(value);
                      }}
                      search
                      placeholder="Search user"
                    />
                  );
                }}
                trigger="click"
              >
                <Avatar icon={<BsPlus className="w-full h-full" />} />
              </Popover>

              {record.members?.map((item) => {
                return item.avatar ? (
                  <Popover
                    placement="top"
                    title="Project Members:"
                    content={() => {
                      console.log(record, "table record");
                      return (
                        <table className="min-w-max w-full table-auto">
                          <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                              <th className="pb-2 pt-1 px-6 text-left">ID</th>
                              <th className="pb-2 pt-1 px-6 text-left">
                                Avatar
                              </th>
                              <th className="pb-2 pt-1 px-6 text-left">
                                Member Name
                              </th>
                              <th className="py-3 px-6 text-left"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {record.members?.map((item, index) => {
                              return (
                                <Fragment>
                                  <tr key={index} className="">
                                    <td className="py-1 px-6 text-left font-semibold ">
                                      {item.userId}
                                    </td>
                                    <td className="py-1 px-6 text-left ">
                                      <Avatar
                                        className="w-7 h-7"
                                        src={item.avatar}
                                      />
                                    </td>
                                    <td className="py-1 px-6 text-left font-semibold capitalize">
                                      {item.name}
                                    </td>
                                    <td className="py-1 px-6 text-left">
                                      <div
                                        className=" p-0 cursor-pointer text-red-500 text-3xl flex items-center hover:text-red-700"
                                        onClick={() => {
                                          dispatch(
                                            removeUserFromProjectAction(
                                              {
                                                projectId: record.id,
                                                userId: item.userId,
                                              },
                                              dispatch
                                            )
                                          );
                                        }}
                                      >
                                        <AiFillCloseSquare className="w-full h-full" />
                                      </div>
                                    </td>
                                  </tr>
                                </Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                      );
                    }}
                  >
                    <Avatar key={item.id} src={item.avatar} />
                  </Popover>
                ) : (
                  <Avatar
                    key={item.id}
                    src="https://joeschmoe.io/api/v1/random"
                  />
                );
              })}
            </Group>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div className="flex items-center">
            {/* EDIT PROJECT  */}
            <div
              className="bg-cyan-500 text-white  inline-block mr-4 p-2  cursor-pointer"
              onClick={() => {
                return handleProjectEdit(record);
              }}
            >
              <AiFillEdit className="text-lg  " />
            </div>
            {/* DELETE PROJECT  */}
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                return confirm(record.id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <div className="bg-red-500 text-white inline-block p-2  cursor-pointer">
                <AiFillDelete className="text-lg " />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="component w-full">
      <div className="breadcumb">
        <NavLink to="/" exact className="breadcumb-text">
          Projects
        </NavLink>
        <span className="breadcumb-divide">/</span>
        <NavLink to="/" exact className="breadcumb-text">
          singularity 1.0
        </NavLink>
        <span className="breadcumb-divide">/</span>

        <NavLink to="/projectmanagement" exact className="breadcumb-text">
          Project Management
        </NavLink>
      </div>
      <h1 className="component-title">Project Management</h1>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
}

export default ProjectManagement;
