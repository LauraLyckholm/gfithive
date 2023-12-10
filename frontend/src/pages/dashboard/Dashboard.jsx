import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { useGiftStore } from "../../stores/useGiftStore";
import { Button } from "../../components/elements/Button/Button"
import "./dashboard.css"

export const Dashboard = () => {
    const { isLoggedIn, username } = useUserStore();
    // const { fetchGifts } = useGiftStore();


    const userHives = useGiftStore.getState().hives;
    // const userGifts = useGiftStore.getState().gifts;


    return (
        <>
            {isLoggedIn ? (
                <div className="dashboard">
                    <h1>{`Welcome to your Gifthive ${username}`}!</h1>
                    {userHives.length - 1 ? (
                        <p>Looks like there aren’t any hives here right now.. Get started by creating one!</p>
                    ) : (
                        <p>You have {userHives.length} gifts in your Gifthive.</p>
                    )}
                    {/* <p>
                        {userGifts.map((gift) => {
                            return (
                                <div key={gift.id}>
                                    <h2>{gift.name}</h2>
                                </div>
                            )
                        })};
                    </p> */}
                </div>

            ) : (
                <div className="dashboard">
                    <p>You need to log in to see the content</p>
                    <Link to="/"><Button className="primary" btnText="Log in" /></Link>
                </div>
            )}

        </>
    )
}
