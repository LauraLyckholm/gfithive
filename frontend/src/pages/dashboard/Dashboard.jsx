import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { useGiftStore } from "../../stores/useGiftStore";
import { Button } from "../../components/elements/Button/Button";
import { AllHives } from "../hives/AllHives";
import { CreateHive } from "../hives/createHive";
import "./dashboard.css";

export const Dashboard = () => {
    const { isLoggedIn, username } = useUserStore();
    const { hives } = useGiftStore();
    // const { navigate } = useNavigate();


    return (
        <>
            {isLoggedIn ? (
                <div className="dashboard">
                    <h1>{`Welcome to your Gifthive ${username}`}!</h1>
                    {hives.length === 0 ? (
                        <CreateHive />
                    ) : (
                        <AllHives />
                    )}
                </div>
            ) : (
                <div className="dashboard">
                    <p>You need to log in to see the content</p>
                    <Link to="/"><Button className="primary" btnText="Log in" /></Link>
                </div>
            )}
        </>
    );
}
