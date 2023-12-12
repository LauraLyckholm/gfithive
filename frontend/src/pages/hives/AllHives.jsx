import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";

export const AllHives = () => {
    const { hives, getHives } = useGiftStore();
    const { accessToken } = useUserStore();

    useEffect(() => {
        getHives();
    }, [hives, accessToken, getHives])

    return (
        <>
            {hives.length === 0 ? (
                <div>
                    <p>Looks like there aren’t any hives here right now.. Get started by creating one!</p>
                    <Link to="/create-hive"><Button className={"primary"} btnText={"Start a new hive"} /></Link>
                </div>
            ) : (
                <>
                    <h2>Your hives:</h2>
                    <ul>
                        {hives.map((hive) => {
                            return (
                                <li key={hive._id}>
                                    <Link to="/"><p>{hive.name}</p></Link>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )
            }
        </>
    )
}
