import React from 'react';
import styleLoading from './Loading.module.css';
// import { useSelector } from 'react-redux';

export default function Loading(props) {

    // const isLoading = useSelector(state => state.LoadingReducer.isLoading)

    // if (isLoading) {
    //     return (
    //         <div className={styleLoading.bgLoading}>
    //             <img src='https://res.cloudinary.com/fpt-food/image/upload/v1639790730/ReactJS_Jira_Bugs_Clone/Curve-Loading_xkidcm.gif' alt="curve-loading.gif"/>
    //         </div>
    //     )
    // } else {
    //     return '';
    // }
	return (
		<div className={styleLoading.bgLoading}>
			<img src='https://res.cloudinary.com/fpt-food/image/upload/v1639790730/ReactJS_Jira_Bugs_Clone/Curve-Loading_xkidcm.gif' alt="curve-loading.gif"/>
		</div>
	)
}