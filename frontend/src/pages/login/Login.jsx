import { useUserStore } from "../../stores/useUserStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/elements/Button";
import "./login.css";

export const Login = () => {
    const navigate = useNavigate();

    // Destructures the function loginUser from the useUserStore hook
    const { loginUser, username, setUsername, password, setPassword } = useUserStore();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await loginUser(username, password);
            const isLoggedIn = useUserStore.getState().isLoggedIn;
            // If the user is logged in, the accessToken will be saved in localStorage and the user will be redirected to the dashboard
            if (isLoggedIn) {
                navigate("/dashboard");
                return;
            }
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    return (
        <>
            <h1>Welcome here!</h1>
            <h2>Please sign in to see the content 🧡</h2>
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <div className="loginAndRegisterBtns">
                    <Button className={"primary"} handleOnClick={handleLogin} btnText={"Login"} />
                    <Link to="/register"><Button className={"secondary"} btnText={"Register"} /></Link>
                </div>
            </form>
        </>
    )
}
