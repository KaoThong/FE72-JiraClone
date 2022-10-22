import React, { Fragment, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import {
	createProjectAction,
	getAllCategoryAction,
} from "redux/actions/editActions";

import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, useHistory } from "react-router-dom";

import "./style.css";
const schema = yup.object().shape({});
function CreateProject() {
	const history = useHistory();
	const dispatch = useDispatch();
	const editorRef = useRef(null);

	const handleChangeEditor = (content) => {
		formik.setFieldValue("description", content);
	};

	// useEffect
	useEffect(() => {
		dispatch(getAllCategoryAction);
	}, []);

	// redux
	const category = useSelector((state) => state.edit.category);

	// render category
	const renderCategory = () => {
		return category?.map((item) => {
			return (
				<option value={item.id} key={item.id}>
					{item.projectCategoryName}
				</option>
			);
		});
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			projectName: "",
			description: "",
			categoryId: category[0]?.id,
			alias: "trong tiến trình",
		},
		onSubmit: (values) => {
			console.log(values);
			dispatch(createProjectAction(values));
		},
	});
	return (
		<div className="component mx-auto  ">
			<div className="w-full " style={{ maxWidth: "640px" }}>
				<div className="breadcumb">
					<NavLink to="/" exact className="breadcumb-text">
						Projects
					</NavLink>
					<span className="breadcumb-divide">/</span>
					<NavLink to="/" exact className="breadcumb-text">
						singularity 1.0
					</NavLink>
					<span className="breadcumb-divide">/</span>

					<NavLink
						to="/createproject"
						exact
						className="breadcumb-text"
					>
						Create Project
					</NavLink>
				</div>
				<h1 className="component-title">Create Project</h1>
				<form onSubmit={formik.handleSubmit}>
					<div className="form-group mt-5">
						<p className="title">Name</p>
						<div className="input-div">
							<input
								className="form-control"
								name="projectName"
								onChange={formik.handleChange}
								placeholder="Enter project name"
							/>
						</div>
					</div>
					<div className="form-group mt-5">
						<p className="title">Description</p>

						<Editor
							name="description"
							apiKey="afrssiupb36mrn4s5p46yxbxxi1qkt9ws77ew114h6hn04yr"
							onEditorChange={handleChangeEditor}
							onInit={(evt, editor) =>
								(editorRef.current = editor)
							}
							initialValue=""
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
							Describe the project in as much detail as you'd
							like.
						</p>
					</div>
					<div className="form-group mt-5">
						<p className="title">Project Category</p>
						<div className="input-div">
							<select
								name="categoryId"
								onChange={formik.handleChange}
							>
								{renderCategory()}
							</select>
						</div>
					</div>
					<button type="submit" className="submit-btn">
						Save changes
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateProject;
