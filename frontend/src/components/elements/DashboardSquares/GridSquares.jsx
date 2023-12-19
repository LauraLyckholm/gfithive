import "./dashboardSquares.css";

export const GridSquares = ({ icon, loggedInUser, amount, text }) => {
    return (
        <div className="dashboard-square">
            <img className="icon" src={icon} alt="" />
            {!loggedInUser ? "No user logged in" :
                <>
                    <p>
                        {`${amount} ${text}`}
                    </p>
                </>}
        </div>
    )
}
