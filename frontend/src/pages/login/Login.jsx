// import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { HiveImage } from "../../components/elements/Images/HiveImage";
import Lottie from "lottie-react";
import loadingSpinner from "../../assets/loading-spinner.json";
import "./login.css";

export const Login = () => {
    const navigate = useNavigate();

    // Destructures the function loginUser and some other states from the useUserStore hook
    const { loginUser, username, setUsername, password, setPassword, loading, errorMessage, setErrorMessage } = useUserStore();

    // Function to handle the login using the loginUser function from the useUserStore hook
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await loginUser(username, password);
            const isLoggedIn = useUserStore.getState().isLoggedIn;
            // If the user is logged in, the accessToken will be saved in localStorage and the user will be redirected to the dashboard

            // If the user gets logged in, the user will be redirected to the dashboard, otherwise an error message will be displayed
            if (isLoggedIn) {
                navigate("/dashboard");
                setErrorMessage("");
                return;
            } else {
                errorMessage;
            }
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    // Function to handle the removal of the errormessage when the user clicks on the register link
    const handleSetErrorMessage = () => {
        setErrorMessage("");
    }

    return (
        <>
            {/* Shows a spinning animation when the data is loading */}
            {loading ? (
                <Lottie animationData={loadingSpinner} className="spinner" />
            ) : (
                <>
                    <HiveImage />
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
                        <div className="btns">
                            <p className="error-message disclaimer">{errorMessage}</p>
                            <Button className={"primary"} handleOnClick={handleLogin} btnText={"Login"} />
                            <div className="light-pair-text">
                                <p className="disclaimer">First time here?</p>
                                <p className="disclaimer"><Link onClick={handleSetErrorMessage} className="disclaimer bold" to="/register">Register</Link> for an account!</p>
                            </div>
                        </div>
                    </form>
                </>
            )
            }
        </>
    )
}
