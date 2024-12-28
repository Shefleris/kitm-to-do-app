import { Link } from "react-router-dom"
import "./landingPage.css"

const LandingPage = () =>{
    return (
        <>
            <div className="landing">
                <div className="landing__image"></div>
                <div className="landing__body">
                    <h1>Task Management & To-Do List</h1>
                    <p>
                        This productive tool is designed to help
                        you better manage your task
                        project-wise conveniently!
                    </p>
                    <Link to="/register" className="button button--outline">Register</Link>
                    <Link to="/login" className="button">Login</Link>
                </div>
            </div>   
        </>
    )
}

export default LandingPage