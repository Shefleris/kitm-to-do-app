import { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "../reducers/reducer";
import { fetchProjectsWithUpdateCallback } from "../services/fetchProjects";
import * as actions from "../actions/actions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/AuthServices";

const initialState = {
	projects: undefined,
	projectsLoading: true,
};

//GV: keep all projects in SPA context (minimize number of requests at the expense of data size)
// force refresh on:
// - app init (when user authenticated)
// - auth change
// - navigate to projects list
// - detect an unknown project id in task
//this could possibly be achieved with Firebase onSnapshot...

const ProjectsContext = createContext(null);
const ProjectsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [user, load, err] = useAuthState(auth);

	useEffect(() => {
		const getProjects = async () => {
			try {
				dispatch({ type: actions.SET_PROJECTS_LOADING });
				// const projectsData = await fetchProjects(user.uid);
				fetchProjectsWithUpdateCallback(user.uid, (projectsData) =>
					dispatch({ type: actions.SET_PROJECTS, payload: { projects: projectsData } })
				);
			} catch (err) {
				//TODO: behavior when loading and failing to load!!!
				console.error(err);
			}
		};

		if (user) {
			// console.log(user);
			getProjects();
		}
	}, [user]);

	return <ProjectsContext.Provider value={{ ...state }}>{children}</ProjectsContext.Provider>;
};

export const useProjectsContext = () => {
	return useContext(ProjectsContext);
};

export { ProjectsContext, ProjectsProvider };
