import HeaderMain from "components/Main/HeaderMain/HeaderMain";
import InfoMain from "components/Main/InfoMain/InfoMain";
import MainContent from "components/Main/MainContent/MainContent";

import React from "react";
import "../";
function Home() {
	return (
		<div className="component w-full">
			<HeaderMain />
			<InfoMain />
			<MainContent />
		</div>
	);
}

export default Home;
