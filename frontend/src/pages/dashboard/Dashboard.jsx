import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { useGiftStore } from "../../stores/useGiftStore";
import { Button } from "../../components/elements/Button/Button";
import "./dashboard.css";

export const Dashboard = () => {
    const { isLoggedIn, username } = useUserStore();
    const { hives, hiveName, setHiveName, getHives, addHive } = useGiftStore();

    const userHives = hives;
    getHives(...userHives);

    const handleAddHive = async (event) => {
        event.preventDefault();

        try {
            await addHive({ name: hiveName });
            console.log(`Hive "${hiveName}" was successfully added`);
            setHiveName("");
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    return (
        <>
            {isLoggedIn ? (
                <div className="dashboard">
                    <h1>{`Welcome to your Gifthive ${username}`}!</h1>
                    {userHives.length === 0 ? (
                        <main>
                            <p>Looks like there aren’t any hives here right now.. Get started by creating one!</p>
                            <form className="form-wrapper">
                                <div className="form-group">
                                    <label htmlFor="hiveName">Hivename</label>
                                    <input
                                        type="text"
                                        id="hiveName"
                                        placeholder="e.g. Mom"
                                        value={hiveName}
                                        onChange={(e) => setHiveName(e.target.value)}
                                        required />
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="giftIdea">Create your first gift idea</label>
                                    <input
                                        type="text"
                                        id="giftIdea"
                                        placeholder="e.g. Honey"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tags">Add tags (separated by comma)</label>
                                    <input
                                        type="text"
                                        id="tags"
                                        placeholder="e.g. christmas, 2023"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div> */}
                                <div className="loginAndRegisterBtns">
                                    <Button className={"primary"} handleOnClick={handleAddHive} btnText={"Start a new hive"} />
                                </div>
                                <p className="disclaimer">Curious on how it works? Buzz over to our <Link to="/faq">FAQ!</Link></p>
                            </form>
                        </main>
                    ) : (
                        <>
                            <h2>Hives:</h2>
                            <ul>
                                {userHives.map((hive) => {
                                    return (
                                        <li key={hive.id}>
                                            <h3>{hive.name}</h3>
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
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
