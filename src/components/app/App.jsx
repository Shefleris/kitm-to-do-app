import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList/ProjectList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProjectList />} />
                <Route path="/create-project" element={<ProjectCreate />} />
            </Routes>
        </Router>
    );
}

export default App;
