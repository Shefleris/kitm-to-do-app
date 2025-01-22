import * as actions from "../constants/actions";

const reducer = (state, action) => {
	switch (action.type) {
		case actions.SET_PROJECTS_LOADING:
			return { ...state, projectsLoading: true };
		case actions.SET_PROJECTS:
			return { ...state, projectsLoading: false, projects: action.payload.projects };
		case actions.GET_TASKS:
		case actions.ADD_PROJECT:
		case actions.ADD_TASK:
		case actions.UPDATE_PROJECT:
		case actions.UPDATE_TASK:
		case actions.UPDATE_TASK_STATE:
		case actions.DELETE_PROJECT:
		case actions.DELETE_TASK:
		default:
			throw new Error(`No matching "${action.type}" action type`);
	}
};

export default reducer;
