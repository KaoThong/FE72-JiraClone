import React, { Fragment } from "react";
import "./style.css";

import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Avatar } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskDetailModal from "components/TaskModal/TaskDetailModal";
import {
	getTaskDetailAction,
} from "redux/actions/taskDetailAction";
import Modal from "react-modal";
import { useEffect } from "react";
import { getAllStatusAction } from "redux/actions/statusAction";
import { getAllPriorityAction } from "redux/actions/priorityAction";
const { Group } = Avatar;

function MainContent() {
	const { projectDetail } = useSelector((state) => state.project);
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		dispatch(getAllStatusAction);
		dispatch(getAllPriorityAction);
	}, []);

	const closeModal = () => {
		setIsOpen(false);
	};

	const handlePriorityIcon = (value) => {
		switch (value.priorityId) {
			case 1:
				return (
					<div className="high-icon">
						<AiOutlineArrowUp />
					</div>
				);
			case 2:
				return (
					<div className="medium-icon">
						<AiOutlineArrowUp />
					</div>
				);
			case 3:
				return (
					<div className="low-icon">
						<AiOutlineArrowDown />
					</div>
				);
			case 4:
				return (
					<div className="lowest-icon">
						<AiOutlineArrowDown />
					</div>
				);
			default:
				return;
		}
	};
	const renderMainContentCard = () => {
		return projectDetail.lstTask?.map((item, index) => {
			return (
				<div className="main-content--col">
					<div className="main-content--col-name">
						{item.statusName}{" "}
						<span className="main-content--col-number">
							{index}
						</span>
					</div>
					<div className="main-content-item">
						{item.lstTaskDeTail?.map((task, index) => {
							return (
								<Fragment>
									<div
										onClick={() => {
											dispatch(
												getTaskDetailAction(task.taskId)
											);
											setIsOpen(true);
										}}
										key={index}
										className="main-content-task"
									>
										<div className="main-content-task--content">
											<p className="task-title">
												{task.taskName}
											</p>
											<div className="main-content-task--action">
												<div className="flex items-center">
													{handlePriorityIcon(
														task.priorityTask
													)}
												</div>
												<div className="avatar-attributor">
													<Group
														maxCount={3}
														className=""
													>
														{task.assigness?.map(
															(user) => {
																return (
																	<Avatar
																		className="w-6 h-6"
																		src={
																			user.avatar
																		}
																	/>
																);
															}
														)}
													</Group>
												</div>
											</div>
										</div>
									</div>
									<Modal
										isOpen={isOpen}
										onRequestClose={closeModal}
										contentLabel="Example Modal"
										ariaHideApp={false}
									>
										<TaskDetailModal
											closeModal={closeModal}
										/>
									</Modal>
								</Fragment>
							);
						})}
					</div>
				</div>
			);
		});
	};
	return <div className="main-content">{renderMainContentCard()}</div>;
}

export default MainContent;
