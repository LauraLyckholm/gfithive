import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
    const { isLoggedIn, logoutUser } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/getstarted");
            console.clear(); // Clears the console after the logout
        } catch (error) {
            console.error("There was an error during logout =>", error);
        }
    }

    return (
        <nav>
            {isLoggedIn ? (
                <Link to="/logout" onClick={handleLogout}>Logout</Link>
            ) : (
                <>
                    <Link to="/getstarted">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    )
}
