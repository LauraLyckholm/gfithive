import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
// import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";
import { WelcomeSquare } from "../../components/elements/DashboardSquares/WelcomeSquare";
import { CreateNewHive } from "../../components/elements/InputFields/CreateNewHive";
import "./dashboard.css";
import { GridSquares } from "../../components/elements/DashboardSquares/GridSquares";
import hiveIcon from "../../assets/hiveIcon.svg";
import giftIcon from "../../assets/giftIcon.svg";
import sharedIcon from "../../assets/sharedIcon.svg";
import deadlineIcon from "../../assets/deadlineIcon.svg";
import { LinkToFAQ } from "../../components/elements/Links/LinkToFAQ";

// Component for the dashboard
export const Dashboard = () => {
    const { isLoggedIn, getDashboard, dashboard } = useUserStore(); // Destructures the function logoutUser from the useUserStore hook
    const [loggedInUser, setLoggedInUser] = useState(""); // Used to display the username in the dashboard
    const hivesAmount = dashboard.hivesCount; // Saves the amount of hives in a variable
    const giftsAmount = dashboard.giftsCount; // Saves the amount of gifts in a variable

    // Fetches the hives when the component mounts
    useEffect(() => {
        getDashboard();
        setLoggedInUser(localStorage.getItem("username"));
    }, [getDashboard])

    return (
        <>
            {/* Displays first the welcome-square, and then the link to the hives and the dashboard info in the coming squares */}
            <WelcomeSquare message={dashboard.message} loggedInUser={loggedInUser} hivesLength={hivesAmount} />
            {isLoggedIn ? (
                <div className="dashboard">
                    {/* If there aren't any hives, the user is prompted to create one */}
                    {hivesAmount === 0 ? (
                        <CreateNewHive />
                    ) : (
                        <>
                            <section className="grid-squares">
                                <>
                                    <Link className="link-square" to="/hives"><GridSquares icon={hiveIcon} loggedInUser={loggedInUser} amount={hivesAmount} text={hivesAmount < 2 ? "hive" : "hives"} /></Link>
                                </>
                                <>
                                    <GridSquares icon={giftIcon} loggedInUser={loggedInUser} amount={giftsAmount} text={giftsAmount < 2 ? "gift" : "gifts"} />
                                </>
                                <>
                                    <GridSquares icon={sharedIcon} loggedInUser={loggedInUser} amount="0" text="shared hives" />
                                </>
                                <>
                                    <GridSquares icon={deadlineIcon} loggedInUser={loggedInUser} amount="0" text="deadlines" />
                                </>

                            </section>
                            <LinkToFAQ />
                        </>
                    )}
                </div>
            ) : (
                // If the user isn't logged in, the user is prompted to log in
                <div className="dashboard">
                    <p>You need to log in to see the content</p>
                    <Link to="/login"><Button className="primary" btnText="Log in" /></Link>
                </div>
            )}
        </>
    )
}