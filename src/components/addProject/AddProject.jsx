import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as service from "../../services/firestoreCRUD.js";
import { auth } from "../../services/AuthServices.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./addProject.scss"

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
		e.preventDefault();
		service.deleteDocument(id, "projects")
		navigate(`/dashboard`)
	}

	useEffect(() => {
		id && service.getDocumentById(id, "projects").then((item)=>setFormData({...item}))
	}, [id]);

	return (
		<div className="card">
			<form className="form" onSubmit={formSubmit}>
				<div className="form__field">
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
				</div>
				<div className="form__field">
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
				</div>
				<div className="form__field">
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
				</div>
				<div className="form__field">
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
				</div>
				<div className="form__buttons">
					<button type="submit" className="btn btn-primary">
						{id ? "Save" : "Create"}
					</button>
					{id ? <button type="button" className="btn btn-primary" onClick={deleteProject}>Delete</button> : ""}
				</div>
			</form>
		</div>
	);
};

export default AddProject;
