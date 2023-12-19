import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { HiveImage } from "../../components/elements/Images/HiveImage";
import Lottie from "lottie-react";
import loadingSpinner from "../../assets/loading-spinner.json";
import "../login/login.css";

export const Register = () => {
    const navigate = useNavigate();

    // Destructures the function loginUser and some other states from the useUserStore hook
    const { registerUser, username, setUsername, password, setPassword, loading, errorMessage, setErrorMessage, successfullFetch } = useUserStore();

    // Function to handle the login using the loginUser function from the useUserStore hook
    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await registerUser(username, password);
            // If the fetch was successfull, the user will be redirected to the login page, otherwise an error message will be displayed
            if (successfullFetch) {
                navigate("/login");
                setErrorMessage("");
                return;
            } else {
                errorMessage;
            }
        } catch (error) {
            console.error("There was an error during signup =>", error);
        }
    }

    return (
        <>
            {/* Shows a spinning animation when the data is loading */}
            {loading ? <Lottie animationData={loadingSpinner} className="spinner" /> :
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                        <div className="btns">
                            {/* Error message displays here */}
                            <p className="error-message disclaimer">{errorMessage}</p>
                            <Button className={"primary"} handleOnClick={handleRegister} btnText={"Register"} />
                            <div className="light-pair-text">
                                <p className="disclaimer">Changed your mind?</p>
                                <p className="disclaimer">Go back <Link className="disclaimer bold" to="/">home</Link>.</p>
                            </div>
                        </div>
                    </form >
                </>
            }
        </>
    )
}