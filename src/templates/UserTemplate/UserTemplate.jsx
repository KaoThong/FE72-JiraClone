import React, { Fragment } from "react";
import { Route } from "react-router-dom";

function UserTemplate(props) {
	let { Component, ...restRoute } = props;
	return (
		<Route
			{...restRoute}
			render={(propsRoute) => {
				return (
					<Fragment>
						<Component {...propsRoute} />
					</Fragment>
				);
			}}
		/>
	);
}

export default UserTemplate;
