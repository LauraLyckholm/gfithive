import { useUserStore } from "../../stores/useUserStore";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import "./hives.css";
import Lottie from "lottie-react";
import loadingSpinner from "../../assets/loading-spinner.json";
import { HiveListComponent } from "./HiveListComponent";

// Component for the hives page, that displays all the users hives
export const Hives = () => {
    const { loading } = useUserStore();

    return (
        <>
            {loading ? <Lottie animationData={loadingSpinner} className="spinner" /> :
                <div>
                    <h1>Hives</h1>
                    <HiveListComponent />
                    <div className="btns">
                        <Link to="/add-hive"><Button className="primary" btnText="Add hive" /></Link>
                        <Link to="/dashboard"><Button className="secondary" btnText="Back to dashboard" /></Link>
                    </div>
                </div >
            }
        </>
    )
}
