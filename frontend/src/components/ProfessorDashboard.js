import React from "react";
import { useNavigate } from "react-router-dom";

const ProfessorDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h2>Professor Dashboard</h2>
            <p>Welcome to your dashboard! Manage your courses here.</p>

            <button onClick={() => navigate("/create")}>Add New Course</button>
            <button onClick={() => navigate("/leaderboard")}>View Leaderboard</button>

            <h3>Your Courses</h3>
            <div id="root"></div> {/* React will mount courses here */}
        </div>
    );
};

export default ProfessorDashboard;
