import { useUserStore } from "../../stores/useUserStore";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
// import { HiveImage } from "../../components/elements/ImageComponents/HiveImage";
import Lottie from "lottie-react";
import loadingSpinner from "../../assets/loading-spinner.json";
import "../login/login.css";

// Component for the registration page
export const Register = () => {

    // Destructures the function loginUser and some other states from the useUserStore hook
    const { registerUser, username, setUsername, password, setPassword, loading, errorMessage, setErrorMessage, successfullFetch } = useUserStore();

    // Function to handle the login using the loginUser function from the useUserStore hook
    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await registerUser(username, password);
            // If the fetch was successfull, the user will be redirected to the login page, otherwise an error message will be displayed
            if (successfullFetch) {
                setErrorMessage("");
                return;
            } else {
                errorMessage;
            }
        } catch (error) {
            console.error("There was an error during signup =>", error);
        }
    }

    const handleClearOnNavigate = () => {
        setErrorMessage("");
    };

    return (
        <>
            {/* Shows a spinning animation when the data is loading */}
            {loading ? <Lottie animationData={loadingSpinner} className="spinner" /> :
                <>
                    <h1>Register for an account</h1>
                    {/* <HiveImage /> */}
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
                        {/* Error message displays here */}
                        <p className="error-message disclaimer">{errorMessage}</p>
                        <Button tabIndex="1" className={"primary"} handleOnClick={handleRegister} btnText={"Register"} />
                        <div className="light-pair-text">
                            <p className="disclaimer">Changed your mind?</p>
                            <p className="disclaimer">Back to <Link onClick={handleClearOnNavigate} className="disclaimer bold" to="/login">login</Link>.</p>
                        </div>
                    </form >
                </>
            }
        </>
    )
}