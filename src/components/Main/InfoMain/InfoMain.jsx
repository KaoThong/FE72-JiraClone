import React from "react";
import "./style.css";
import { FiSearch } from "react-icons/fi";
import { Avatar } from "antd";
const { Group } = Avatar;
function InfoMain(props) {
	const { projectDetail } = props;
	const renderAvatarMembers = () => {
		return projectDetail.members?.map((item) => {
			return <Avatar key={item.userId} src={item.avatar} />;
		});
	};
	// console.log(props, "props");
	return (
		<div className="info-main">
			{/* SEARCH BOX  */}
			<div className="info-search-container relative">
				<div className="info-search-icon">
					<FiSearch />
				</div>
				<input className="w-full info-search" />
			</div>
			{/* AVATAR ROW  */}
			<Group maxCount={3} className="">
				{/*  */}
				{renderAvatarMembers()}
			</Group>

			{/* INFO BUTTON  */}
			<button className="info-btn">Only My Issues</button>
			<button className="info-btn">Recently Updated</button>
		</div>
	);
}

export default InfoMain;
