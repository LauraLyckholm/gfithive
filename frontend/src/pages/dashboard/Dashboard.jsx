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
import giftIcon from "../../assets/giftIcon.svg";
import sharedIcon from "../../assets/sharedIcon.svg";
import deadlineIcon from "../../assets/deadlineIcon.svg";
import { LinkToFAQ } from "../../components/elements/Links/LinkToFAQ";

export const Dashboard = () => {
    const { getHives } = useGiftStore(); // Destructures the function getHives from the useGiftStore hook
    const { isLoggedIn, getDashboard, dashboard } = useUserStore(); // Destructures the function logoutUser from the useUserStore hook
    const [loggedInUser, setLoggedInUser] = useState(""); // Used to display the username in the dashboard
    // const hivesLength = hives.length;
    const hivesAmount = dashboard.hivesCount;
    const giftsAmount = dashboard.giftsCount;

    // Fetches the hives when the component mounts
    useEffect(() => {
        getHives();
        getDashboard();
        setLoggedInUser(localStorage.getItem("username"));
        // setHives(localStorage.getItem("hives"));
    }, [])




    // fetch("https://gifthive.onrender.com/gift-routes/", ")

    return (
        <>
            <WelcomeSquare loggedInUser={loggedInUser} hivesLength={hivesAmount} />

            {/* <ul>
                {gifts.map((gift) => {
                    return (
                        <li key={gift._id}>
                            <p>{gift.gift}</p>
                        </li>
                    )
                })}
            </ul> */}

            {isLoggedIn ? (
                <div className="dashboard">
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
                <div className="dashboard">
                    <p>You need to log in to see the content</p>
                    <Link to="/login"><Button className="primary" btnText="Log in" /></Link>
                </div>
            )}
        </>
    )
}