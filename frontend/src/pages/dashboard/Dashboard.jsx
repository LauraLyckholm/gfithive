import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";
import { WelcomeSquare } from "../../components/elements/DashboardSquares/WelcomeSquare";
import { CreateNewHive } from "../../components/elements/InputFields/CreateNewHive";
import "./dashboard.css";
import { GridSquares } from "../../components/elements/DashboardSquares/GridSquares";
import hiveIcon from "../../assets/hiveIcon.svg";
import { LinkToFAQ } from "../../components/elements/Links/LinkToFAQ";

export const Dashboard = () => {
    const { hives, getHives } = useGiftStore(); // Destructures the function getHives from the useGiftStore hook
    const { accessToken, isLoggedIn, username } = useUserStore(); // Destructures the function logoutUser from the useUserStore hook
    const [loggedInUser, setLoggedInUser] = useState(""); // Used to display the username in the dashboard

    // Fetches the hives when the component mounts
    useEffect(() => {
        getHives();
        setLoggedInUser(localStorage.getItem("username"));
        // setHives(localStorage.getItem("hives"));
    }, [hives, accessToken, getHives, username, isLoggedIn])

    // // Clears hives data when the user logs out
    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         // Clear hives data when the user logs out
    //         getHives([]);
    //     }
    // }, [isLoggedIn, getHives]);

    const hivesLength = hives.length;

    return (
        <>
            <WelcomeSquare loggedInUser={loggedInUser} hivesLength={hivesLength} />
            {isLoggedIn ? (
                <div className="dashboard">
                    {hivesLength === 0 ? (
                        <CreateNewHive />
                    ) : (
                        <>
                            <div className="grid-squares">
                                <Link to="/hives"><GridSquares icon={hiveIcon} loggedInUser={loggedInUser} amount={hivesLength} text={"hives"} /></Link>
                            </div>
                            <LinkToFAQ />
                        </>
                    )}
                </div>
            ) : (
                <div className="dashboard">
                    <p>You need to log in to see the content</p>
                    <Link to="/login"><Button className="primary" btnText="Log in" /></Link>
                </div>
            )}
        </>
    )
}