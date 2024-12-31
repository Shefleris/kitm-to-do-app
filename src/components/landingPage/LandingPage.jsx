import "./landingPage.css"
import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth } from "../../services/AuthServices";

const LandingPage = () =>{
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(()=>{
        if (user){
            navigate("/dashboard")
        }
    },[user,error])
    return (
        <>
            <div className="landing">
                <div className="landing__image"></div>
                <div className="landing__body">
                    <h1>Project Task Management</h1>
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