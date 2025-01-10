import "./header.css"
import { useLocation, useNavigate } from "react-router-dom";
import User from "../user/User";

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const locationName = location.pathname.split("/")

    switch (locationName[1]) {
        case "dashboard":
            return (
                <nav>
                    <User/>
                    <div>
                        <h2>Dashboard</h2>
                    </div>
                    <div></div>
                </nav>
            );
        case "add-project":
        case "update-project":
            return (
                <nav>
                    <button onClick={() => navigate("/dashboard")}>{`<`}</button>
                    <div>
                        <h2>Add project</h2>
                    </div>
                    <div></div>
                </nav>
            )

        case "projects":
            return (
                <nav>
                    <button onClick={() => navigate("/dashboard")}>{`<`}</button>
                    <div>
                        <h2>Project Tasks</h2>
                    </div>
                    <div></div>
                </nav>
            );
        case "add-task":
            return (
                <nav>
                    <button onClick={() => navigate("/dashboard")}>{`<`}</button>
                    <div>
                        <h2>Add task</h2>
                    </div>
                    <div></div>
                </nav>
            );
        default:
            break;
    }
};

export default Header;
