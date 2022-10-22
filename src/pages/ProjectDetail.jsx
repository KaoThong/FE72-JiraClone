import HeaderMain from "components/Main/HeaderMain/HeaderMain";
import InfoMain from "components/Main/InfoMain/InfoMain";
import MainContent from "components/Main/MainContent/MainContent";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	getProjectDetailAction,
	setProjectListAction,
} from "redux/actions/projectActions";
import { getAllTaskTypeAction } from "redux/actions/taskTypeAction";

function ProjectDetail(props) {
	const dispatch = useDispatch();
	const match = useParams();
	const id = match.id;

	const { projectDetail } = useSelector((state) => state.project);

	useEffect(() => {
		dispatch(setProjectListAction);
		dispatch(getProjectDetailAction(id));
		dispatch(getAllTaskTypeAction);
	}, []);

	return (
		<div className="component w-full">
			<HeaderMain projectDetail={projectDetail} />
			<InfoMain projectDetail={projectDetail} />
			<MainContent projectDetail={projectDetail} id={id} />
		</div>
	);
}

export default ProjectDetail;
