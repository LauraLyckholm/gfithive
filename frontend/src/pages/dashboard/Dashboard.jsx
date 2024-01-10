import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";
import { WelcomeSquare } from "../../components/elements/DashboardSquares/WelcomeSquare";
import { CreateNewHive } from "../create/CreateNewHive";
import "./dashboard.css";
import { GridSquares } from "../../components/elements/DashboardSquares/GridSquares";
import hiveIcon from "../../assets/hiveIcon.svg";
import giftIcon from "../../assets/giftIcon.svg";
import sharedIcon from "../../assets/sharedIcon.svg";
import deadlineIcon from "../../assets/deadlineIcon.svg";
import userIconLight from "../../assets/userIconLight.svg";
import { LinkToFAQ } from "../../components/elements/Links/LinkToFAQ";
import Lottie from "lottie-react";
import loadingSpinner from "../../assets/loading-spinner.json";
import dayjs from "dayjs";

// Component for the dashboard
export const Dashboard = () => {
    const { isLoggedIn, getDashboard, dashboard, loadingUser } = useUserStore(); // Destructures the function logoutUser from the useUserStore 
    const { loadingHives } = useGiftStore(); // Gets the loading state from the useGiftStore 
    const [loggedInUser, setLoggedInUser] = useState(""); // Used to display the username in the dashboard
    const hivesAmount = dashboard.hivesCount; // Saves the amount of hives in a variable
    const giftsAmount = dashboard.giftsCount; // Saves the amount of gifts in a variable
    const sharedHives = dashboard.sharedHives; // Saves the amount of shared hives in a variable
    const allHives = JSON.parse(localStorage.getItem("hives"));

    // Fetches the hives when the component mounts
    useEffect(() => {
        getDashboard();
        setLoggedInUser(localStorage.getItem("username"));
    }, [getDashboard])

    // Function to count overdue gifts in a hive
    const countOverdueGifts = (allHives) => {
        return allHives.map(hive => {
            return hive.gifts.reduce((count, gift) => {
                const dueDate = dayjs(gift.dueDate);
                return dueDate.isValid() && dueDate.isBefore(dayjs()) ? count + 1 : count;
            }, 0);
        })
    };

    // Function to handle showing the amount of overdue gifts in the dashboard
    const handleShowingOverdueGifts = () => {
        if (countOverdueGifts(allHives) > 0) {
            return countOverdueGifts(allHives);
        } else {
            return `0`;
        }
    }

    // Function to count the amount of hives shared with others
    const mySharedHives = (allHives) => {
        return allHives.map(hive => {
            return hive.sharedWith;
        })
    }
    console.log("sharedHives", mySharedHives(allHives));

    // Function to handle showing the amount of shared hives, both shared by the user and shared to the user, in the dashboard
    // const handleShowingSharedHives = () => {
    //     const sharedByUser = sharedHives(allHives).reduce((total, current) => total + current, 0);
    //     console.log("sharedByUser", sharedByUser);
    //     // const sharedToUser = sharedHives.length;
    //     // return sharedByUser + sharedToUser;
    // }

    return (
        <>
            {/* Displays first the welcome-square, and then the link to the hives and the dashboard info in the coming squares */}

            {isLoggedIn ? (
                <>
                    {loadingUser || loadingHives ? (
                        <Lottie animationData={loadingSpinner} className="spinner" />
                    ) : (
                        <><WelcomeSquare
                            message={dashboard.message}
                            loggedInUser={loggedInUser}
                            hivesLength={hivesAmount}
                        />
                            <div className="dashboard">
                                {/* If there aren't any hives, the user is prompted to create one */}
                                {hivesAmount === 0 ? (
                                    <CreateNewHive />
                                ) : (
                                    // If there are hives, the user is shown the dashboard info
                                    <>
                                        <section className="grid-squares">
                                            <>
                                                <GridSquares icon={hiveIcon} loggedInUser={loggedInUser} amount={hivesAmount} text={hivesAmount < 2 ? "hive" : "hives"} />
                                            </>
                                            <div className="grid-squares buttons">
                                                <Link to="/hives"><Button className="primary" btnText="See my hives" /></Link>
                                                <Link to="/add-hive"><Button className="primary" btnText="Add hive" /></Link>
                                            </div>
                                            <>
                                                <GridSquares icon={giftIcon} loggedInUser={loggedInUser} amount={giftsAmount} text={giftsAmount < 2 ? "gift" : "gifts"} />
                                            </>

                                            <>
                                                <Link className="button-square" to="/account">
                                                    <GridSquares icon={userIconLight} text="My account" />
                                                </Link>
                                            </>
                                            <>
                                                <GridSquares icon={deadlineIcon} loggedInUser={loggedInUser} text="deadlines" amount={handleShowingOverdueGifts()} />
                                            </>
                                            <>
                                                {/* <GridSquares icon={sharedIcon} loggedInUser={loggedInUser} amount={handleShowingSharedHives()} text="shared hives" /> */}
                                            </>
                                        </section>
                                        <LinkToFAQ />
                                    </>
                                )}
                            </div>
                        </>

                    )}

                </>
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