import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
// import { HiveImage } from "../../components/elements/ImageComponents/HiveImage";
import { LinkToFAQ } from "../../components/elements/Links/LinkToFAQ";
import { useUserStore } from "../../stores/useUserStore";
import Logo from "../../assets/gifthive-logo.png";
import "./home.css";
import { Dashboard } from "../dashboard/Dashboard";

// Component for the home page
export const Home = () => {
    const { isLoggedIn } = useUserStore();

    return (
        <>
            {/* If the user is logged in it shows the dashboard, otherwise prompts the user to log in */}
            {isLoggedIn ?
                <Dashboard />
                : <>
                    {/* <HiveImage /> */}
                    <section className="main-content">
                        <div className="content">
                            <h1>Welcome to</h1>
                            <img id="logo" src={Logo} alt="Logo" />
                        </div>
                        <div className="content">
                            <Link to="/login"><Button className="primary" btnText="Get started" /></Link>
                            <LinkToFAQ />
                        </div>
                    </section>
                </>
            }
        </>
    )
}
