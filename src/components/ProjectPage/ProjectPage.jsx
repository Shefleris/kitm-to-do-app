import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const ProjectPage = () => {
    const location = useLocation();
    const projectName = location.state?.projectName || "Unknown Project";

    const [filter, setFilter] = useState("All");

    // pavyzdiniai taskai filtravimui
    const tasks = [
        { id: 1, name: "Task 1", description: "This is the first task", status: "To Do" },
        { id: 2, name: "Task 2", description: "This is the second task", status: "In Progress" },
        { id: 3, name: "Task 3", description: "This is the third task", status: "To Do" },
        { id: 4, name: "Task 4", description: "This is the fourth task", status: "In Progress" },
    ];

    const filteredTasks = filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

    return (
        <div className="project-page">
            <h1>{projectName}</h1>
            <div className="task-filters">
                <button onClick={() => setFilter("All")}>All</button>
                <button onClick={() => setFilter("To Do")}>To Do</button>
                <button onClick={() => setFilter("In Progress")}>In Progress</button>
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
