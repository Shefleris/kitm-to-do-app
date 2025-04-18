import { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "../reducers/reducer";
import { fetchProjectsWithUpdateCallback } from "../services/fetchProjects";
import * as actions from "../constants/actions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/AuthServices";

const initialState = {
	projects: undefined,
	projectsLoading: true,
};

const ProjectsContext = createContext(null);
const ProjectsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const [user, load, err] = useAuthState(auth);

	useEffect(() => {
		const getProjects = async () => {
			try {
				dispatch({ type: actions.SET_PROJECTS_LOADING });
				fetchProjectsWithUpdateCallback(user.uid, (projectsData) =>
					dispatch({ type: actions.SET_PROJECTS, payload: { projects: projectsData } })
				);
			} catch (err) {
				console.error(err);
			}
		};

		if (user) {
			getProjects();
		}
	}, [user]);

	return <ProjectsContext.Provider value={{ ...state }}>{children}</ProjectsContext.Provider>;
};

export const useProjectsContext = () => {
	return useContext(ProjectsContext);
};

export { ProjectsContext, ProjectsProvider };
