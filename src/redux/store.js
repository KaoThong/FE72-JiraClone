import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "redux/reducers/authReducer";
import editReducer from "redux/reducers/editReducer";
import projectReducer from "redux/reducers/projectReducer";
import drawerModal from "redux/reducers/drawerModalReducer";
import user from 'redux/reducers/userReducer'
import taskType from 'redux/reducers/taskTypeReducer'
import priority from 'redux/reducers/priorityReducer'
import status from 'redux/reducers/statusReducer'
import taskDetail from 'redux/reducers/taskDetailReducer'
const rootReducer = combineReducers({
	auth: authReducer,
	edit: editReducer,
	project: projectReducer,
	drawerModal,
	user,
	taskType,
	priority,
	status,
	taskDetail,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
