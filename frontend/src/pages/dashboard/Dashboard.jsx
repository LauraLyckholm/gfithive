import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { Button } from "../../components/elements/Button"
import "./dashboard.css"

export const Dashboard = () => {
    const { isLoggedIn, logoutUser } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/");
            console.clear(); // Clears the console after the logout
        } catch (error) {
            console.error("There was an error during logout =>", error);
        }
    }

    return (
        <>
            {isLoggedIn ? (
                <div className="dashboard">
                    <iframe src="https://giphy.com/embed/YTbZzCkRQCEJa" width="480" height="360" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/party-excited-birthday-YTbZzCkRQCEJa"></a></p>
                    <Link to="/logout" onClick={handleLogout}><Button className="primary" btnText="Log out" /></Link>
                </div>

            ) : (
                <div className="dashboard">
                    <p>You need to log in to see the content</p>
                    <Link to="/"><Button className="primary" btnText="Log in" /></Link>
                </div>
            )}

        </>
    )
}
