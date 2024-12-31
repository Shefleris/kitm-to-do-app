import "./projectPage.css";
import React, { useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";

const ProjectPage = () => {
    const location = useLocation();
    const projectName = location.state?.projectName || "Unknown Project";
    const [filter, setFilter] = useState("All");
    const projectId = location.pathname.split('/');
    const navigate = useNavigate()

    // pavyzdiniai taskai filtravimui
    const tasks = [
        { id: 1, name: "Task 1", description: "This is the first task", status: "To Do" },
        { id: 2, name: "Task 2", description: "This is the second task", status: "In Progress" },
        { id: 3, name: "Task 3", description: "This is the third task", status: "To Do" },
        { id: 4, name: "Task 4", description: "This is the fourth task", status: "In Progress" },
    ];

    const handleEdit = () => {
        navigate(`/update-project/${projectId[2]}`)
    }

    const filteredTasks = filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

    return (
        <div className="project-page">
            <div className="project__header">
                <h1>{projectName}</h1>
                <button onClick={handleEdit}>Edit</button>
            </div>
            <div className="task-filters">
                <button className="button__filter" onClick={() => setFilter("All")}>All</button>
                <button className="button__filter" onClick={() => setFilter("To Do")}>To Do</button>
                <button className="button__filter" onClick={() => setFilter("In Progress")}>In Progress</button>
            </div>
            <div className="task-list">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div key={task.id} className="task-card">
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                            <p>
                                <strong>Status:</strong> {task.status}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
