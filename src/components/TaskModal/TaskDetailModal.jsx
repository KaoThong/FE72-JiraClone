import React, { Fragment, useRef, useState } from "react";
import "./style.css";

import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiLink } from "react-icons/fi";
import { BiTrash, BiStopwatch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { BsPlus } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdOutlineBookmark } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Avatar, Input, Modal, Progress, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import {
	CHANGE_ASSIGNESS,
	CHANGE_TASK_MODAL,
	REMOVE_USER_ASSIGN,
} from "utils/Constants/constants";
import {
	assignUserTaskAction,
	getAllComment,
	getTaskDetailAction,
	insertCommentAction,
	removeUserFromTaskAction,
	updateDescriptionTaskDetail,
	updateEstimateTaskDetail,
	updatePriorityTaskDetailAction,
	updateTaskDetailAction,
	updateTimeTrackingAction,
} from "redux/actions/taskDetailAction";
import { getProjectDetailAction } from "redux/actions/projectActions";
import { useEffect } from "react";

const { Option } = Select;
const { TextArea } = Input;
const parse = require("html-react-parser");
function TaskDetailModal(props) {
	const dispatch = useDispatch();
	const estimateRef = useRef(null);
	const commentRef = useRef(null);
	// const { closeModal } = props;

	// state MODAL
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// state reducer binding data
	const { taskTypeList } = useSelector((state) => state.taskType);
	const { taskDetailModal } = useSelector((state) => state.taskDetail);
	const { statusList } = useSelector((state) => state.status);
	const { priorityList } = useSelector((state) => state.priority);
	const { projectDetail } = useSelector((state) => state.project);
	const { commentList } = useSelector((state) => state.taskDetail);
	const projectId = projectDetail?.id;
	// console.log("task detail", taskDetailModal);
	const taskId = taskDetailModal?.taskId;

	function insert_contents(inst) {
		inst.setContent(taskDetailModal?.description);
	}
	useEffect(() => {
		if (!taskId) {
			return;
		} else {
			dispatch(getAllComment(taskId));
		}
	}, [taskId]);
	// state SHOW/HIDE EDITOR
	const [visibleEditor, setVisibleEditor] = useState(false);
	const [historyContent, setHistoryContent] = useState(
		taskDetailModal.description
	);
	const [content, setContent] = useState(taskDetailModal.description);
	// state SHOW/HIDE ADD MORE
	const [visibleAddMore, setVisibleAddMore] = useState(false);

	// state SHOW/HIDE TASK TYPE
	const [visibleTaskType, setVisibleTaskType] = useState(false);

	// state SHOW/HIDE COMMENT
	const [visibleComment, setVisibleComment] = useState(false);
	const [commentContent, setCommentContent] = useState("");

	const reporterInfo = JSON.parse(localStorage.getItem("user"));
	// RENDER FUNCTION
	const renderDescription = () => {
		return (
			<div className="w-full">
				{visibleEditor ? (
					<div className="w-full">
						<Editor
							defaultValue={taskDetailModal?.description}
							onEditorChange={(content, editor) => {
								setContent(content);
							}}
							name="description"
							apiKey="afrssiupb36mrn4s5p46yxbxxi1qkt9ws77ew114h6hn04yr"
							init={{
								height: "400",
								menubar: false,
								plugins: [
									"advlist",
									"autolink",
									"lists",
									"link",
									"image",
									"charmap",
									"preview",
									"anchor",
									"searchreplace",
									"visualblocks",
									"code",
									"fullscreen",
									"insertdatetime",
									"media",
									"table",
									"code",
									"help",
									"wordcount",
								],
								toolbar:
									"undo redo | blocks | " +
									"bold italic forecolor | alignleft aligncenter " +
									"alignright alignjustify | bullist numlist outdent indent | " +
									"removeformat | help",
								content_style:
									"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
								init_instance_callback: insert_contents,
							}}
						/>
						<div
							className="flex flex-end w-full"
							style={{ marginTop: "-18px" }}
						>
							{/* DONE  */}
							<button
								className="submit-btn mr-2"
								onClick={(e) => {
									setVisibleEditor(!visibleEditor);
									dispatch({
										type: CHANGE_TASK_MODAL,
										name: "description",
										value: content,
									});
									console.log("content", content);
									console.log(
										"task descript",
										taskDetailModal?.description
									);
									dispatch(
										updateDescriptionTaskDetail(
											{
												taskId,
												description: content,
											},
											dispatch
										)
									);
								}}
							>
								Save
							</button>
							{/* CANCEL  */}
							<button
								className="submit-btn"
								onClick={(e) => {
									setVisibleEditor(!visibleEditor);

									dispatch({
										type: CHANGE_TASK_MODAL,
										name: "description",
										value: historyContent,
									});
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<div
						onClick={() => {
							setHistoryContent(taskDetailModal.description);
							setVisibleEditor(!visibleEditor);
						}}
					>
						{taskDetailModal.description
							? parse(taskDetailModal.description)
							: ""}
					</div>
				)}
			</div>
		);
	};
	const renderOptionsStatus = () => {
		return statusList?.map((status, index) => {
			return { label: status.statusName, value: status.statusId };
		});
	};
	const renderOptionsPriority = () => {
		return priorityList?.map((priority) => {
			return (
				<Option value={priority.priorityId} key={priority.priorityId}>
					{priority.priority}
				</Option>
			);
		});
	};
	const renderTimeTracking = () => {
		const max =
			Number(taskDetailModal?.timeTrackingSpent) +
			Number(taskDetailModal?.timeTrackingRemaining);
		const percent = (Number(taskDetailModal.timeTrackingSpent) / max) * 100;
		return (
			<Fragment>
				<div
					className="pt-1 pr-1 pb-1 pl-0 flex items-center w-full time-tracking cursor-pointer rounded"
					onClick={showModal}
				>
					<div
						className="text-3xl"
						style={{ color: "rgb(94, 108, 132)" }}
					>
						<BiStopwatch />
					</div>
					<div className="w-full ml-1">
						<div className="w-full " style={{ marginTop: "-8px" }}>
							<Progress
								percent={percent}
								showInfo={false}
								strokeWidth={5}
								strokeColor={"#0052cc"}
							/>
						</div>
						<div
							className="flex justify-between items-center font-medium"
							style={{
								fontSize: "13px",
								color: " rgb(23, 43, 77)",
							}}
						>
							<p>{`${taskDetailModal?.timeTrackingSpent}h logged`}</p>
							<p>{`${taskDetailModal?.timeTrackingRemaining}h estimated`}</p>
						</div>
					</div>
				</div>
				<Modal
					className="time-tracking-modal"
					title={null}
					closable={false}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					bodyStyle={{ paddingTop: "12px" }}
					footer={null}
					centered
				>
					<div className="flex items-center justify-between pb-2 mb-1">
						<p
							className="text-xl font-medium"
							style={{
								color: "rgb(23, 43, 77)",
								lineHeight: "1.2",
							}}
						>
							Time tracking
						</p>
						<div
							className="text-2xl p-1 cursor-pointer close-btn-time-tracking"
							style={{
								color: "rgb(94, 108, 132)",
								lineHeight: "1",
							}}
							onClick={handleCancel}
						>
							<MdClose />
						</div>
					</div>

					<div
						className="pt-1 pr-1 pb-1 pl-0 flex items-center w-full time-tracking cursor-pointer rounded"
						onClick={showModal}
					>
						<div
							className="text-3xl"
							style={{
								color: "rgb(94, 108, 132)",
								marginLeft: "-4px",
							}}
						>
							<BiStopwatch />
						</div>
						<div className="w-full ml-2">
							<div
								className="w-full "
								style={{ marginTop: "-8px" }}
							>
								<Progress
									percent={percent}
									showInfo={false}
									strokeWidth={5}
									strokeColor={"#0052cc"}
								/>
							</div>
							<div
								className="flex justify-between items-center font-medium"
								style={{
									fontSize: "13px",
									color: " rgb(23, 43, 77)",
									marginTop: "-6px",
								}}
							>
								<p>{`${taskDetailModal?.timeTrackingSpent}h logged`}</p>
								<p>{`${taskDetailModal?.timeTrackingRemaining}h remaining`}</p>
							</div>
						</div>
					</div>

					<div className="flex items-center mt-4 w-full">
						<div className=" w-1/2" style={{ marginRight: "10px" }}>
							<p
								className="  pb-1 font-medium"
								style={{
									fontSize: "12.5px",
									color: "rgb(94, 108, 132)",
								}}
							>
								Time spent (hours)
							</p>
							<input
								type="number"
								className="rounded "
								name="timeTrackingSpent"
								value={taskDetailModal?.timeTrackingSpent}
								onChange={(e) => {
									dispatch({
										type: CHANGE_TASK_MODAL,
										name: e.target.name,
										value: +e.target.value,
									});
								}}
							/>
						</div>
						<div className=" w-1/2">
							<p
								className=" pb-1  font-medium"
								style={{
									fontSize: "12.5px",
									color: "rgb(94, 108, 132)",
								}}
							>
								Time remaining (hours)
							</p>
							<input
								type="number"
								className="rounded "
								name="timeTrackingRemaining"
								value={taskDetailModal?.timeTrackingRemaining}
								onChange={(e) => {
									dispatch({
										type: CHANGE_TASK_MODAL,
										name: e.target.name,
										value: +e.target.value,
									});
								}}
							/>
						</div>
					</div>

					<div className="flex justify-end ">
						<button
							className="submit-btn "
							onClick={() => {
								handleCancel();
								dispatch(
									updateTimeTrackingAction({
										taskId,
										timeTrackingSpent:
											taskDetailModal.timeTrackingSpent,
										timeTrackingRemaining:
											taskDetailModal.timeTrackingRemaining,
									})
								);
							}}
						>
							Done
						</button>
					</div>
				</Modal>
			</Fragment>
		);
	};

	// HANDLE CHANGE INPUT+SELECT
	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		dispatch({
			type: CHANGE_TASK_MODAL,
			name,
			value,
		});
	};
	const handleChangeSelect = (e, name) => {
		dispatch({
			type: CHANGE_TASK_MODAL,
			name,
			value: e,
		});
	};
	console.log("task detail component", taskDetailModal);
	return (
		<div className="task-modal">
			<div className="task-modal-header">
				<div className="header-left pl-1">
					{visibleTaskType ? (
						<Select
							style={{ width: "150px" }}
							optionFilterProp="label"
							onChange={(e) => handleChangeSelect(e, "typeId")}
						>
							{taskTypeList?.map((task) => {
								switch (task.taskType) {
									case "bug":
										return (
											<Option
												value={task.id}
												label={task.taskType}
											>
												<div className="flex items-center">
													<div
														className="text-xl"
														style={{
															color: "rgb(228, 77, 66)",
														}}
													>
														<RiErrorWarningFill />
													</div>
													<p className="pl-1 capitalize font-medium">
														{task.taskType}
													</p>
												</div>
											</Option>
										);
									case "new task":
										return (
											<Option
												value={task.id}
												label={task.taskType}
											>
												<div className="flex items-center">
													<div
														className="  text-xl"
														style={{
															color: "rgb(101, 186, 67)",
														}}
													>
														<MdOutlineBookmark />
													</div>
													<p className="pl-1 capitalize font-medium">
														{task.taskType}
													</p>
												</div>
											</Option>
										);
									default:
										return "";
								}
							})}
						</Select>
					) : (
						<div
							className="pl-2 capitalize flex items-center"
							onClick={() => setVisibleTaskType(!visibleTaskType)}
						>
							{taskDetailModal.taskTypeDetail?.taskType ===
							"bug" ? (
								<div
									className="text-xl"
									style={{ color: "rgb(228, 77, 66)" }}
								>
									<RiErrorWarningFill />
								</div>
							) : (
								<div
									className="  text-xl"
									style={{ color: "rgb(101, 186, 67)" }}
								>
									<MdOutlineBookmark />
								</div>
							)}
							<p className="pl-1 capitalize font-medium">
								{taskDetailModal.taskTypeDetail?.taskType}
							</p>
						</div>
					)}
				</div>
				<div className="header-right">
					<div className="flex items-center justify-center px-3 ml-1 header-item">
						<div className="text-xl font-semibold">
							<IoPaperPlaneOutline />
						</div>
						<p className="pl-1 text-sm">Give feedback</p>
					</div>
					<div className="flex items-center justify-center  px-3 ml-1 header-item">
						<div className="text-xl font-semibold">
							<FiLink />
						</div>
						<p className="pl-1 text-sm">Copy link</p>
					</div>
					<div className="flex items-center justify-center  px-3 ml-1 header-item">
						<div className="text-xl font-semibold ">
							<BiTrash />
						</div>
					</div>
					<div
						className="flex items-center justify-center  px-2 ml-1 header-item"
						// onClick={closeModal}
					>
						<div className="text-2xl font-semibold">
							<AiOutlineClose />
						</div>
					</div>
				</div>
			</div>
			{/* MAIN  */}
			<div className="task-modal-main px-7 flex">
				<div className="modal-main-left">
					{/* TASK NAME  */}
					<div className="modal-task-name">
						<input
							className="task-name-input"
							name="taskName"
							value={taskDetailModal?.taskName}
							onChange={(e) => {
								handleChangeInput(e);

								dispatch(
									updateTaskDetailAction({
										listUserAsign:
											taskDetailModal.assigness.map(
												(item) => item.id
											),
										taskId: taskDetailModal.taskId,
										taskName: e.target.value,
										description:
											taskDetailModal.description,
										statusId: taskDetailModal.statusId,
										originalEstimate:
											taskDetailModal.originalEstimate,
										timeTrackingSpent:
											taskDetailModal.timeTrackingSpent,
										timeTrackingRemaining:
											taskDetailModal.timeTrackingRemaining,
										projectId: projectId,
										typeId: taskDetailModal.typeId,
										priorityId: taskDetailModal.priorityId,
									})
								);
							}}
						/>
					</div>
					{/* DESCRIPTION  */}
					<div className="modal-task-description ">
						<p className="title">Description</p>
						{renderDescription()}
					</div>
					{/* COMMENT  */}
					<div className="modal-task-comment pt-10">
						<p
							style={{
								fontSize: "15px",
								fontWeight: 500,
							}}
						>
							Comments
						</p>
						<div
							className="flex "
							style={{ marginTop: "25px", fontSize: "15px" }}
						>
							<Avatar
								className="w-8 h-8 mr-3"
								src={reporterInfo.avatar}
							/>
							<div>
								{visibleComment ? (
									<div>
										<TextArea
											allowClear
											className="textarea-comment"
											onChange={(e) => {
												console.log(e.target.value);
												if (commentRef !== null) {
													clearTimeout(
														commentRef.current
													);
												}
												commentRef.current = setTimeout(
													() => {
														setCommentContent(
															e.target.value
														);
													},
													700
												);
											}}
											onPressEnter={(e) => {
												console.log(e.target.value);
												dispatch(
													insertCommentAction(
														{
															taskId,
															contentComment:
																e.target.value,
														},
														dispatch
													)
												);
												setVisibleComment(
													!visibleComment
												);
											}}
										></TextArea>
										<div
											className="flex"
											style={{ marginTop: "-15px" }}
										>
											<button
												className="submit-btn mr-2"
												onClick={() => {
													setVisibleComment(
														!visibleComment
													);
													dispatch(
														insertCommentAction(
															{
																taskId,
																contentComment:
																	commentContent,
															},
															dispatch
														)
													);
												}}
											>
												Save
											</button>
											<button
												className="cancel-btn"
												onClick={() =>
													setVisibleComment(
														!visibleComment
													)
												}
											>
												Cancel
											</button>
										</div>
									</div>
								) : (
									<div>
										<div
											className="comment-input"
											onClick={() =>
												setVisibleComment(
													!visibleComment
												)
											}
										>
											Add a comment...
										</div>
										<div
											className="flex items-center pt-2"
											style={{
												fontSize: "13px",
												color: "rgb(94, 108, 132)",
											}}
										>
											<strong className="pr-1 font-medium">
												Pro tip:{" "}
											</strong>
											press
											<p
												className="px-1 mx-1 text-xs leading-5 rounded-sm font-bold"
												style={{
													background:
														"rgb(223, 225, 230)",
													color: "rgb(23, 43, 77)",
												}}
											>
												{" "}
												Enter{" "}
											</p>
											to comment
										</div>
									</div>
								)}
							</div>
						</div>
						{/* COMMENTS SHOW PART  */}
						{commentList?.map((comment) => {
							return <div
								className="flex "
								style={{ marginTop: "22px", fontSize: "15px" }}
								key={comment.id}
							>
								<Avatar
									className="mr-3"
									src={comment.user.avatar}
								/>
								<div>
									<p className="name-comment">{comment.user.name}</p>
									<p className="date-comment">4 days ago</p>
									<div className="comment-text">
										{comment.contentComment}
									</div>
									<div className="flex">
										<div className="comment-btn">Edit</div>
										<div className="comment-btn">
											Delete
										</div>
									</div>
								</div>
							</div>;
						})}
					
					</div>
				</div>
				<div className="modal-main-right">
					<p className="modal-status">Status</p>
					{/* STATUS  */}
					<Select
						value={taskDetailModal?.statusId}
						name="statusId"
						className="w-full"
						onChange={(e) => {
							handleChangeSelect(e, "statusId");
						}}
						options={renderOptionsStatus()}
					></Select>
					<p className="modal-status">Assignees</p>
					{/* ASSIGNEES  */}
					<div className="flex items-center flex-wrap ">
						{taskDetailModal.assigness?.map((user) => {
							return (
								<div
									className="assigness-user"
									key={user.id}
									onClick={(e) => {
										dispatch({
											type: REMOVE_USER_ASSIGN,
											userId: user.id,
										});
										dispatch(
											removeUserFromTaskAction({
												taskId,
												userId: user.id,
											})
										);
									}}
								>
									<Avatar
										className="w-6 h-6"
										src={user.avatar}
									/>
									<p
										className=" pl-2 font-medium"
										style={{
											paddingRight: "2px",
											color: "#172b4d",
											fontSize: "14px",
										}}
									>
										{user.name}
									</p>
									<div className="mt-1">
										<GrFormClose />
									</div>
								</div>
							);
						})}
						<div
							className=" addmore-btn"
							onClick={() => setVisibleAddMore(!visibleAddMore)}
						>
							<div className="text-lg">
								<BsPlus />
							</div>
							<p className="font-medium">Add more</p>
						</div>
						{visibleAddMore ? (
							<Select
								defaultValue="0"
								className="w-full"
								showSearch
								optionFilterProp="label"
								filterOption={(input, option) =>
									option.children
										.toLowerCase()
										.includes(input.toLowerCase())
								}
								onSelect={(e) => {
									let userSelect =
										projectDetail?.members.find(
											(mem) => mem.userId === e
										);
									console.log("user select", userSelect);
									let oldAssigness =
										taskDetailModal.assigness.map(
											(item) => item.id
										);
									let newAssigness = oldAssigness.push(
										userSelect.userId
									);
									console.log("userId", userSelect.userId);
									console.log(
										oldAssigness,
										"old assignnnnnnnnnnnnnnnnnnnnn"
									);
									console.log(newAssigness, "new assign");
									dispatch({
										type: CHANGE_ASSIGNESS,
										userAssign: {
											id: userSelect.userId,
											avatar: userSelect.avatar,
											name: userSelect.name,
											alias: userSelect.name,
										},
									});

									dispatch(
										updateTaskDetailAction({
											listUserAsign: oldAssigness,
											taskId: taskDetailModal.taskId,
											taskName: taskDetailModal.taskName,
											description:
												taskDetailModal.description,
											statusId: taskDetailModal.statusId,
											originalEstimate:
												taskDetailModal.originalEstimate,
											timeTrackingSpent:
												taskDetailModal.timeTrackingSpent,
											timeTrackingRemaining:
												taskDetailModal.timeTrackingRemaining,
											projectId: projectId,
											typeId: taskDetailModal.typeId,
											priorityId:
												taskDetailModal.priorityId,
										})
									);
								}}
							>
								<Option disabled value="0" selected>
									Select user assign
								</Option>

								{projectDetail.members
									?.filter((mem) => {
										let index =
											taskDetailModal.assigness?.findIndex(
												(taskMember) =>
													taskMember.id === mem.userId
											);
										if (index !== -1) {
											return false;
										} else {
											return true;
										}
									})
									.map((item, index) => {
										return (
											<Option value={item.userId}>
												{item.name}
											</Option>
										);
									})}
							</Select>
						) : (
							""
						)}
					</div>
					<p className="modal-status">reporter</p>
					{/* REPORTERS  */}
					<div className="inline-block">
						<div className="assigness-user reporter">
							<Avatar
								className="w-6 h-6"
								src={reporterInfo?.avatar}
							/>
							<p
								className=" pl-2 font-medium"
								style={{
									paddingRight: "2px",
									color: "#172b4d",
									fontSize: "14px",
								}}
							>
								{reporterInfo?.name}
							</p>
							<div className="mt-1">
								<GrFormClose />
							</div>
						</div>
					</div>
					<p className="modal-status">Priority</p>
					{/* PRIORITY  */}
					<Select
						className="w-full"
						value={taskDetailModal?.priorityId}
						name="priorityId"
						onChange={(e) => {
							handleChangeSelect(+e, "priorityId");
							dispatch(
								updatePriorityTaskDetailAction(
									{
										taskId,
										priorityId: +e,
									},
									dispatch,
									projectId
								)
							);
						}}
					>
						{renderOptionsPriority()}
					</Select>
					<p className="modal-status">Original estimate(hours)</p>
					<input
						type="number"
						name="originalEstimate"
						value={taskDetailModal?.originalEstimate}
						onChange={(e) => {
							dispatch({
								type: CHANGE_TASK_MODAL,
								name: e.target.name,
								value: +e.target.value,
							});
							if (estimateRef !== null) {
								clearTimeout(estimateRef.current);
							}
							estimateRef.current = setTimeout(() => {
								dispatch(
									updateEstimateTaskDetail(
										{
											taskId,
											originalEstimate: +e.target.value,
										},
										dispatch
									)
								);
							}, 500);
						}}
					/>
					<p className="modal-status">Time tracking</p>
					{renderTimeTracking()}
					<div className="update-status">
						<p>Created at a day ago</p>
						<p>Updated at a day ago</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TaskDetailModal;
