import UserIcon from "../../../assets/userIcon.svg";
import "./dashboardSquares.css";

// Component for the welcome square
export const WelcomeSquare = ({ message, loggedInUser, hivesLength }) => {

    return (
        <div className="dashboard-square welcome-square">
            <img src={UserIcon} alt="" />
            {loggedInUser ? <>
                <h1>
                    {message}
                </h1>
                {hivesLength === 0 ? <p>Looks like there aren’t any hives here right now.. Get started by creating one!</p> : null}
            </> :
                null}
        </div>

    )
}
