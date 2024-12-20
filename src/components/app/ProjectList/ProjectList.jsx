import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css';
import { collection, getDocs } from "firebase/firestore";
import db from '../../firebase';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const projectsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProjects(projectsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProjects();
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
            <div className="project-list">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <h2>{project.name}</h2>
                            <p>{project.description || 'No description provided'}</p>
                            <p>
                                <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Priority:</strong> {project.priority || 'Not Set'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No projects available. Click "Add New Project" to create one!</p>
                )}
            </div>
        </div>
    );
};

export default ProjectList;