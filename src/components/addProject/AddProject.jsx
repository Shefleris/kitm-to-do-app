import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as service from "../../services/firestoreCRUD.js";
import { auth } from "../../services/AuthServices.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./addProject.css"

const AddProject = () => {
	const navigate = useNavigate()
	const { id } = useParams();
	const [user, loading, error] = useAuthState(auth)
	const [formData, setFormData] = useState({
		projectName: "",
		projectDesc: "",
		projectStartDate: "",
		projectEndDate: "",
		uid: ""
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
			service.updateDocument(id, formData, "projects");
			navigate(`/projects/${id}`);
		} else {
			const docRef = await service.addDocument(
				{...formData,
					uid: user.uid
				}
				,"projects");
				await navigate(`/projects/${docRef}`)
		}
	};

	const deleteProject = () => {
		service.deleteDocument(id, "projects")
		navigate(`/dashboard`)
	}

	useEffect(() => {
		id && service.getDocumentById(id, "projects").then((item)=>setFormData({...item}))
	}, [id]);

	return (
		<div className="card">
			<div className="card-header">
				<h2>{id ? "Edit" : "Create"} Project</h2>
			</div>
			<div className="card-body">
				<form className="form" onSubmit={formSubmit}>
					<div className="form-floating">
						<input
							type="text"
							name="projectName"
							className="form-control"
							onChange={formValueChange}
							value={formData.projectName}
							placeholder="Project name"
							required
						/>
						<label htmlFor="projectName">Project name</label>
					</div>
					<div className="form-floating">
						<textarea
							name="projectDesc"
							className="form-control"
							onChange={formValueChange}
							value={formData.projectDesc}
							placeholder="Project description"
							maxLength="300"
						/>
						<label htmlFor="projectDesc">Description</label>
					</div>
					<div className="form-floating">
						<span></span>
						<input
							type="date"
							name="projectStartDate"
							className="form-control"
							onChange={formValueChange}
							value={formData.projectStartDate}
						/>
						<label htmlFor="projectStartDate">
							Start date
						</label>
					</div>
					<div className="form-floating">
						<input
							type="date"
							name="projectEndDate"
							className="form-control"
							onChange={formValueChange}
							value={formData.projectEndDate}
						/>
						<label htmlFor="projectEndDate">
							End date
						</label>
					</div>
					<button type="submit" className="btn btn-primary">
						{id ? "Save" : "Create"}
					</button>
				</form>
				{id ? <button className="btn btn-primary" onClick={deleteProject}>Delete</button> : ""}
			</div>
		</div>
	);
};

export default AddProject;
