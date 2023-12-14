import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import "./home.css";

export const Home = () => {

    return (
        <>
            <h1>Welcome to</h1>
            <img id="logo" src="/gifthive-logo.png" alt="Logo" />
            <Link to="/login"><Button className="primary" btnText="Get started" /></Link>
        </>
    )
}
