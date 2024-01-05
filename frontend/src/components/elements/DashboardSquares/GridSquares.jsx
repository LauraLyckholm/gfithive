import "./dashboardSquares.css";

// Component for the grid squares
export const GridSquares = ({ icon, loggedInUser, amount, text }) => {
    return (
        <div className="dashboard-square">
            <img src={icon} alt="" />
            {loggedInUser ? <>
                <p>
                    {`${amount} ${text}`}
                </p>
            </> :
                <p>{text}</p>
            }
        </div>
    )
}
