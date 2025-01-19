import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as service from "../../services/firestoreCRUD.js";
import { auth } from "../../services/AuthServices.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useProjectsContext } from "../../contexts/projectsContext";
import LoadingPlaceholder from "../ui/LoadingPlaceholder.jsx";
import "./addTask.scss";

const AddTask = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [user, loading, error] = useAuthState(auth);
	const { projects, projectsLoading } = useProjectsContext();

	const [formData, setFormData] = useState({
		taskName: "",
		taskDesc: "",
		taskDeadline: "",
		taskState: "",
		uid: "",
		projectId: "",
	});

	const formValueChange = (e) => {
		e.preventDefault();
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const formSubmit = async (e) => {
		e.preventDefault();
		if (id) {
			service.updateDocument(id, formData, "tasks");
			navigate(`/projects`);
		} else {
			const docRef = await service.addDocument({ ...formData, uid: user.uid }, "tasks");
			await navigate(`/projects`);
		}
	};

	return (
		<div className="card">
			<form className="form" onSubmit={formSubmit}>
				<div className="form__field">
					<div className="form-floating">
						<input
							type="text"
							name="taskName"
							className="form-control"
							onChange={formValueChange}
							value={formData.taskName}
							placeholder="Task name"
							required
						/>
						<label htmlFor="taskName">Task name</label>
					</div>
				</div>
				<div className="form__field">
					<div className="form-floating">
						<textarea
							name="taskDesc"
							className="form-control"
							onChange={formValueChange}
							value={formData.taskDesc}
							placeholder="Task description"
							maxLength="300"
						/>
						<label htmlFor="taskDesc">Description</label>
					</div>
				</div>
				<div className="form__field">
					<div className="form-floating">
						<input type="date" name="taskDeadline" className="form-control" onChange={formValueChange} value={formData.taskDeadline} />
						<label htmlFor="taskDeadline">Deadline</label>
					</div>
				</div>
				<div className="form__field">
					<div className="form-floating">
						<select name="taskState" className="form-control" onChange={formValueChange} value={formData.taskState}>
							<option value={"not started"}>Not started</option>
							<option value={"in progress"}>In progress</option>
							<option value={"finished"}>Finished</option>
						</select>
						<label htmlFor="projectId">Select task state</label>
					</div>
				</div>
				<div className="form__field">
					<div className="form-floating">
						{projectsLoading ? (
							<LoadingPlaceholder formFactor="select" />
						) : (
							<select name="projectId" className="form-control" onChange={formValueChange} value={formData.projectId}>
								<option>Select project to which assign the task</option>
								{projects.map((project) => (
									<option key={project.id} value={project.id}>
										{project.name}
									</option>
								))}
							</select>
						)}
						<label htmlFor="projectId">Select project</label>
					</div>
				</div>
				<div className="form__buttons">
					<button type="submit" className="btn btn-primary">
						{id ? "Save" : "Create"}
					</button>
					{id ? (
						<button type="button" className="btn btn-primary" onClick={deleteTask}>
							Delete
						</button>
					) : (
						""
					)}
				</div>
			</form>
		</div>
	);
};

export default AddTask;
