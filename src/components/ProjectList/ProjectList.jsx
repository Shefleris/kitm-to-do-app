import './ProjectList.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchProjects from '../../services/fetchProjects';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const getProjects = async () => {
        try {
            const projectsData = await fetchProjects();
            console.log("Fetched projects data in ProjectList:", projectsData);
            setProjects(projectsData);
            console.log("Projects state after update:", projectsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    getProjects();
}, []);

    const handleAddNewProject = () => {
        navigate('/add-project');
    };

    return (
        <div className="project-list-container">
            <div className="header">
                <h1>Projects</h1>
                <button className="add-project-btn" onClick={handleAddNewProject}>
                    Add New Project
                </button>
            </div>
            {loading && <p>Loading projects...</p>}
            {error && <p>Error: {error}</p>}
            <div className="project-list">
                {!loading && projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div
                            key={project.id || index}
                            className="project-card"
                            onClick={() => navigate(`/projects/${project.id}`, { state: { projectName: project.name } })}
                        >
                            <h2>{project.name || "Unnamed Project"}</h2>
                            <p>{project.description || "No description provided"}</p>
                            <div className='project__dates'>
                                <p>
                                    <strong>Start Date:</strong>{' '}
                                    {project.startDate ? new Date(project.startDate).toLocaleDateString() : "Invalid or Missing Date"}
                                </p>
                                <p>
                                    <strong>End Date:</strong>{' '}
                                    {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Invalid or Missing Date"}
                                </p> 
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>No projects available. Click "Add New Project" to create one!</p>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
