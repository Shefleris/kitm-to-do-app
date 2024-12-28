import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css';
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
                setProjects(projectsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getProjects();
    }, []);

    const handleAddNewProject = () => {
        navigate('/create-project');
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
                    projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <h2>{project.projectName}</h2>
                            <p>{project.projectDesc || 'No description provided'}</p>
                            <p>
                                <strong>Start Date:</strong>{' '}
                                {new Date(project.projectStartDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>End Date:</strong>{' '}
                                {new Date(project.projectEndDate).toLocaleDateString()}
                            </p>
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
