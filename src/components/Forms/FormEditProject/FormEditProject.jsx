import { Col, Form, Row } from "antd";

import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";

import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SUBMIT_EDIT_PROJECT } from "redux/actions/drawerModalActions";
import { updateProjectAction } from "redux/actions/projectActions";
import { useState } from "react";
// import { updateProjectAction } from "redux/actions/projectActions";
function FormEditProject() {
	const dispatch = useDispatch();
	
	const projectEdit = useSelector((state) => state.project.projectEdit);
	const category = useSelector((state) => state.edit.category);

	useEffect(() => {
		dispatch({
			// dispatch hàm handleSubmit của formik lên store
			type: SET_SUBMIT_EDIT_PROJECT,
			submitFunction: formik.handleSubmit,
		});
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			projectName: projectEdit?.projectName,
			description: projectEdit?.description,
			categoryId: projectEdit?.categoryId,
			id: projectEdit?.id,
			creator: projectEdit?.creator.id,
		},
		onSubmit: (values) => {
			
			console.log(values, "form edit values");
			dispatch(updateProjectAction(values,dispatch))
		},
	});
	const submitForm = (e) => {
		e.preventDefault();
		formik.handleSubmit();
	};
	const renderOption = () => {
		return category?.map((item, index) => {
			return (
				<option key={index} value={item.id}>
					{item.projectCategoryName}
				</option>
			);
		});
	};
	const handleEditorChange = (value) => {
		formik.setFieldValue("description", value);
	};
	return (
		<Fragment>
			<Form onSubmit={submitForm}>
				<Row>
					<Col span={12} className="pr-4">
						<div className="form-group">
							<p className="font-bold mb-1">Project ID:</p>
							<input
								disabled
								className="form-control cursor-not-allowed"
								name="id"
								value={formik.values.id}
							/>
						</div>
					</Col>
					<Col span={12} className="">
						<div className="form-group">
							<p className="font-bold mb-1">Project Name:</p>
							<input
								className="form-control"
								name="projectName"
								value={formik.values.projectName}
								onChange={formik.handleChange}
							/>
						</div>
					</Col>
					<Col span={12} className="pr-4">
						<div className="form-group mt-4">
							<p className="font-bold mb-1">Project Creator:</p>
							<input	
							
								disabled
								className="form-control cursor-not-allowed"
								name="creator"
								value={formik.values.creator}
								onChange={formik.handleChange}
							/>
						</div>
					</Col>
					<Col span={12} className="">
						<div className="form-group  mt-4">
							<p className="font-bold mb-1">Project Category:</p>
							{/* <input
								className="form-control"
								name="categoryId"
								value={formik.values.categoryId}
								onChange={formik.handleChange}
							/> */}
							<select
								name="categoryId"
								className="w-full"
								value={formik.values.categoryId}
								onChange={formik.handleChange}
							>
								{renderOption()}
							</select>
						</div>
					</Col>
					<Col span={24} className="">
						<div className="form-group  mt-4">
							<p className="font-bold mb-1">Description:</p>
							<Editor
								value={formik.values.description}
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
						</div>
					</Col>
				</Row>
			</Form>
		</Fragment>
	);
}

export default FormEditProject;
