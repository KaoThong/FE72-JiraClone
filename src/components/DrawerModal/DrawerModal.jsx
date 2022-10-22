import React, { Fragment, useState } from "react";
import { Drawer, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER, OPEN_DRAWER } from "redux/actions/drawerModalActions";
import "./style.css";
function DrawerModal(props) {
	const dispatch = useDispatch();
	// cac state cua Drawer tren Reducer
	const { open, componentContentDrawer, callBackSubmit, title } = useSelector(
		(state) => state.drawerModal
	);

	const showDrawer = () => {
		dispatch({
			type: OPEN_DRAWER,
		});
	};
	const onClose = () => {
		dispatch({
			type: CLOSE_DRAWER,
		});
	};
	return (
		<Fragment>
			<Drawer
				title={title}
				width={720}
				onClose={onClose}
				open={open}
				bodyStyle={{
					paddingBottom: 80,
				}}
			>
				{/* NỘI DUNG THAY ĐỔI CỦA DRAWER MODAL  */}
				{componentContentDrawer}
				<Space className="flex justify-end pt-8">
					<button className=" cancel-btn-drawer" onClick={onClose}>
						Cancel
					</button>
					<button
						className="submit-btn-drawer"
						type="submit"
						onClick={callBackSubmit}
					>
						Submit
					</button>
				</Space>
			</Drawer>
		</Fragment>
	);
}

export default DrawerModal;
