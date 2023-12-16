import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { HiveImage } from "../../components/elements/BeehiveImage/HiveImage";
import Logo from "../../assets/gifthive-logo.png";
import "./home.css";

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
                    <p className="disclaimer">Curious on how it works? Buzz over to our <Link className="bold" to="/faq">FAQ!</Link></p>
                </div>
            </section>
        </>
    )
}
