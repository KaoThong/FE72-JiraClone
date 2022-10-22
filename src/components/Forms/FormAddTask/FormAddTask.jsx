import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider, InputNumber, Col, Row, Input } from "antd";
import { BiStopwatch } from "react-icons/bi";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTaskTypeAction } from "redux/actions/taskTypeAction";
import { getAllPriorityAction } from "redux/actions/priorityAction";
import {
	getUserAction,
	getUserByProjectIdAction,
} from "redux/actions/userAction";
import { useFormik } from "formik";
import { SET_SUBMIT_CREATE_TASK } from "redux/actions/drawerModalActions";
import * as yup from "yup";
import { string, number } from "yup";
import { createTaskAction } from "redux/actions/projectActions";
import { getAllStatusAction } from "redux/actions/statusAction";
const { Option } = Select;
const schema = yup.object().shape({
	taskName: string().required("Please enter taskname"),
	description: string().required("Please enter description"),
	statusId: string().required("Please select status"),
	originalEstimate: number().required("Please enter estimate time"),
	timeTrackingSpent: number().required("Please enter time spent"),
	timeTrackingRemaining: number().required("Please enter time remaining"),
	projectId: number().required("Please select project name"),
	typeId: number().required("Please select task type"),
	priorityId: number().required("Please select priority"),
});
function FormAddTask() {
	const dispatch = useDispatch();
	const [timeTracking, setTimeTracking] = useState({
		timeTrackingSpent: 0,
		timeTrackingRemaining: 0,
	});
	// ASSIGN
	const handleChangeAssign = (value) => {
		console.log(`Selected: ${value}`);

		// set lai gia tri cho listUserAsign
		formik.setFieldValue("listUserAsign", value);
	};
	const handleChangeSearchAssign = (value) => {
		dispatch(getUserAction(value));
	};
	const handleEditorChange = (e) => {
		formik.setFieldValue("description", e);
	};

	const { projectList } = useSelector((state) => state.project);
	const { taskTypeList } = useSelector((state) => state.taskType);
	const { priorityList } = useSelector((state) => state.priority);
	const { arrUser } = useSelector((state) => state.user);
	const { statusList } = useSelector((state) => state.status);

	const projectListOwn = projectList?.filter(
		(project) =>
			project.creator.id === JSON.parse(localStorage.getItem("user")).id
	);

	// đổi option cho thẻ select assign
	const userOptionsAssign = arrUser?.map((user) => {
		return { value: user.userId, label: user.name };
	});

	useEffect(() => {
		dispatch(getAllTaskTypeAction);
		dispatch(getAllPriorityAction);
		dispatch(getUserAction);
		dispatch(getAllStatusAction);
		dispatch({
			type: SET_SUBMIT_CREATE_TASK,
			submitFunction: formik.handleSubmit,
		});
	}, []);

	const renderOptionsProjectName = () => {
		return projectListOwn?.map((item) => {
			return (
				<Option className="capitalize" key={item.id} value={item.id}>
					{item.projectName}
				</Option>
			);
		});
	};
	const renderOptionsTaskType = () => {
		return taskTypeList?.map((item) => {
			return (
				<Option className="capitalize" key={item.id} value={item.id}>
					{item.taskType}
				</Option>
			);
		});
	};
	const renderOptionsPriority = () => {
		return priorityList?.map((item) => {
			return (
				<Option key={item.priorityId} value={item.priorityId}>
					{item.priority}
				</Option>
			);
		});
	};
	const renderOptionsStatus = () => {
		return statusList?.map((status) => {
			return (
				<Option key={status.statusId} value={status.statusId}>
					{status.statusName}
				</Option>
			);
		});
	};

	// FORMIK
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			listUserAsign: [0],
			taskName: "string",
			description: "string",
			statusId: statusList[0]?.statusId,
			originalEstimate: 0,
			timeTrackingSpent: 0,
			timeTrackingRemaining: 0,
			projectId: projectList[0]?.id,
			typeId: taskTypeList[0]?.id,
			priorityId: priorityList[0]?.priorityId,
		},
		onSubmit: (values) => {
			console.log(values, "values formik");
			dispatch(createTaskAction(values, dispatch));
		},
		validationSchema: schema,
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<Row className="mt-5">
				<Col span={12} className="pr-4 ">
					{/* PROJECT ID  */}
					<div className="form-group">
						<p className="title">Project Name</p>
						<Select
							placeholder="Project name"
							className="w-full"
							name="projectId"
							onChange={(e) => {
								// dispatch gia tri lam thay doi user assign
								dispatch(getUserByProjectIdAction(e));
								console.log("project name", e);
								// cap nhat gia tri project
								formik.setFieldValue("projectId", e);
							}}
							onBlur={formik.handleBlur}
							value={formik.values.projectName}
						>
							{renderOptionsProjectName()}
						</Select>
						<p className="editor-text--below">
							Start typing to get a list of possible matches.
						</p>
					</div>
					{/* {formik.touched.projectId && formik.errors.projectId && (
						<p className="text-red-600 italic mt-2">
							{formik.errors.projectId}
						</p>
					)} */}
				</Col>
				<Col span={12} className="pl-4">
					{/* PROJECT ID  */}
					<div className="form-group">
						<p className="title">Task Name</p>
						<Input
							name="taskName"
							onChange={formik.handleChange}
							defaultValue={formik.values.taskName}
						/>
						<p className="editor-text--below">
							Start typing to get a list of possible matches.
						</p>
					</div>
				</Col>
				<Col span={12} className="pr-4 mt-5">
					{/* TASK TYPE  */}
					<div className="form-group">
						<p className="title">Task Type</p>

						<Select
							className="w-full"
							name="typeId"
							value={formik.values.typeId}
							onChange={(e) => formik.setFieldValue("typeId", e)}
						>
							{renderOptionsTaskType()}
						</Select>
						<p className="editor-text--below">
							Start typing to get a list of possible matches.
						</p>
					</div>
				</Col>
				<Col span={12} className="pl-4 mt-5">
					{/* PRIORITY  */}
					<div className="form-group ">
						<p className="title">Priority</p>
						<Select
							className="w-full"
							name="priorityId"
							value={formik.values.priorityId}
							onChange={(e) => {
								console.log(e, "priority");
								formik.setFieldValue("priorityId", e);
							}}
						>
							{renderOptionsPriority()}
						</Select>
						<p className="editor-text--below">
							Priority in relation to other issues.
						</p>
					</div>
				</Col>
				<Col span={12} className="pr-4 mt-5">
					{/* ASSIGN  */}
					<div className="form-group">
						<p className="title">Assignees</p>
						<Select
							name="listUserAsign"
							mode="multiple"
							allowClear
							placeholder="Enter member name	"
							optionFilterProp="label"
							onChange={handleChangeAssign}
							onSearch={(value) =>
								handleChangeSearchAssign(value)
							}
							style={{
								width: "100%",
							}}
							options={userOptionsAssign}
						></Select>
					</div>
				</Col>
				<Col span={12} className="pl-4 mt-5">
					{/* STATUS ID  */}
					<div className="form-group">
						<p className="title">Status</p>
						<Select
							name="statusId"
							value={formik.values.statusId}
							onChange={(e) => {
								formik.setFieldValue("statusId", e);
							}}
							className="w-full"
						>
							{renderOptionsStatus()}
						</Select>
					</div>
				</Col>
			</Row>

			{/* TIME  */}
			<div className="form-group mt-5">
				<div className="flex items-center w-full ">
					<Row className="w-full">
						<Col span={12} className="mb-5 pr-4">
							<p className="title">ORIGINAL ESTIMATE (HOURS)</p>
							<input
								type="number"
								defaultValue="0"
								name="originalEstimate"
								min="0"
								onChange={formik.handleChange}
							/>
						</Col>
						{/* SLIDER  */}
						<Col span={12} className="pl-3">
							<p className="title">TIME TRACKING</p>
							<div className="flex items-center w-full">
								<div
									className="text-4xl mr-1"
									style={{ color: "#5e6c84" }}
								>
									<BiStopwatch />
								</div>
								<div className="w-full">
									<Slider
										value={Number(
											timeTracking.timeTrackingSpent
										)}
										max={
											Number(
												timeTracking.timeTrackingSpent
											) +
											Number(
												timeTracking.timeTrackingRemaining
											)
										}
										className="ml-2 mr-0 mb-0 mt-1 p-0"
									/>
									{timeTracking.timeTrackingSpent !== 0 &&
									timeTracking.timeTrackingSpent !== 0 ? (
										<div className="flex items-center justify-between px-2">
											<p className="title">{`${timeTracking.timeTrackingSpent}h logged`}</p>
											<p className="title">{`${timeTracking.timeTrackingRemaining}h remaining`}</p>
										</div>
									) : (
										<p className="normal-text">
											No time logged
										</p>
									)}
								</div>
							</div>
						</Col>

						<Col span={12} className="pr-4 mt-5">
							<p className="title">Time spent(hours)</p>
							<input
								type="number"
								defaultValue={timeTracking.timeTrackingSpent}
								name="timeTrackingSpent"
								min="0"
								onChange={(e) => {
									setTimeTracking({
										...timeTracking,
										timeTrackingSpent: e.target.value,
									});
									formik.setFieldValue(
										"timeTrackingSpent",
										+e.target.value
									);
								}}
							/>
						</Col>

						<Col span={12} className="pl-4 mt-5">
							<p className="title">Time remaining (hours)</p>
							<input
								type="number"
								defaultValue={
									timeTracking.timeTrackingRemaining
								}
								name="timeTrackingRemaining"
								min="0"
								onChange={(e) => {
									setTimeTracking({
										...timeTracking,
										timeTrackingRemaining: e.target.value,
									});
									formik.setFieldValue(
										"timeTrackingRemaining",
										+e.target.value
									);
								}}
							/>
						</Col>
					</Row>
				</div>
			</div>
			{/* DESCRIPTION  */}
			<div className="form-group mt-5">
				<p className="title">Description</p>
				<Editor
					onEditorChange={handleEditorChange}
					name="description"
					apiKey="afrssiupb36mrn4s5p46yxbxxi1qkt9ws77ew114h6hn04yr"
					init={{
						height: 200,
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
					}}
				/>
				<p className="editor-text--below">
					Describe the issue in as much detail as you'd like.
				</p>
			</div>
		</form>
	);
}

export default FormAddTask;
