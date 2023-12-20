import UserIcon from "../../../assets/userIcon.svg";
import "./dashboardSquares.css";

export const WelcomeSquare = ({ loggedInUser, hivesLength }) => {

    return (
        <div className="dashboard-square welcome-square">
            <img src={UserIcon} alt="" />
            {!loggedInUser ? "No user logged in" :
                <>
                    <h1>
                        {`Welcome to Gifthive ${loggedInUser}`}!
                    </h1>
                    {hivesLength === 0 ? <p>Looks like there aren’t any hives here right now.. Get started by creating one!</p> : null}
                </>}
        </div>

    )
}
