import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";
import { WelcomeSquare } from "../../components/elements/DashboardSquares/WelcomeSquare";

export const AllHives = () => {
    const { hives, getHives, deleteHive } = useGiftStore(); // Destructures the function getHives from the useGiftStore hook
    const { accessToken, isLoggedIn, username, logoutUser } = useUserStore(); // Destructures the function logoutUser from the useUserStore hook
    const [loggedInUser, setLoggedInUser] = useState(""); // Used to display the username in the dashboard

    // Fetches the hives when the component mounts
    useEffect(() => {
        getHives();
        setLoggedInUser(localStorage.getItem("username"));
    }, [hives, accessToken, getHives, username, isLoggedIn])

    // Clears hives data when the user logs out
    useEffect(() => {
        if (!isLoggedIn) {
            // Clear hives data when the user logs out
            getHives([]);
        }
    }, [isLoggedIn, getHives]);

    // Function to handle the delete using the deleteHive function from the useGiftStore hook
    const handleDelete = async (hiveId) => {
        try {
            await deleteHive(hiveId);
            getHives();
        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    // Function to handle the logout using the logoutUser function from the useUserStore hook
    const handleLogout = () => {
        // Call the logoutUser function to log the user out
        logoutUser();
    };

    const hivesLength = hives.length;

    return (
        <>
            <WelcomeSquare loggedInUser={loggedInUser} hivesLength={hivesLength} />
            {isLoggedIn ? (
                <div className="dashboard">
                    <h1>{`Welcome to your Gifthive ${loggedInUser}`}!</h1>
                    {hivesLength === 0 ? (
                        <div>

                            <Link to="/create-hive"><Button className={"primary"} btnText={"Start a new hive"} /></Link>
                        </div>
                    ) : (
                        <>
                            <h2>Your hives:</h2>
                            <ul>
                                {hives.map((hive) => {
                                    return (
                                        <li className="list-item-pair" key={hive._id}>
                                            <Link to={`/hives/${hive._id}`}><p>{hive.name}</p></Link>
                                            <p onClick={() => handleDelete(hive._id)}>Delete</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                    <Button className="primary" btnText="Logout" onClick={handleLogout} />
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