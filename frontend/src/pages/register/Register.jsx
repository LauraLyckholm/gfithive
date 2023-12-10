import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import "../login/login.css";

export const Register = () => {
    const navigate = useNavigate();

    // Destructures the function loginUser from the useUserStore hook
    const { registerUser, username, setUsername, password, setPassword } = useUserStore();

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await registerUser(username, password);
            if (username && password) {
                navigate("/getstarted");
                return;
            }
        } catch (error) {
            console.error("There was an error during signup =>", error);
        }
    }

    return (
        <>
            <h1>New here?</h1>
            <h2>No worries, just create a new account to be able to join the community!</h2>
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
                <div className="loginAndRegisterBtns">
                    <Button className={"secondary"} handleOnClick={handleRegister} btnText={"Register"} />
                    <Link to="/"><Button className={"primary"} btnText={"Start over"} /></Link>
                </div>
            </form>
        </>
    )
}