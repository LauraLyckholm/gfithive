import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { HiveImage } from "../../components/elements/Images/HiveImage";
import { LinkToFAQ } from "../../components/elements/Links/LinkToFAQ";
import Logo from "../../assets/gifthive-logo.png";
import "./home.css";

// Component for the home page
export const Home = () => {

    return (
        <>
            <HiveImage />
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
    )
}
