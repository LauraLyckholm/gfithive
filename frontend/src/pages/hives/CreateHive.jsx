import { Link } from "react-router-dom";
import { useGiftStore } from "../../stores/useGiftStore";
import { Button } from "../../components/elements/Button/Button";
import "../dashboard/dashboard.css";

export const CreateHive = () => {
    const { hiveName, setHiveName, addHive } = useGiftStore();

    const handleAddHive = async (event) => {
        event.preventDefault();

        try {
            await addHive({ name: hiveName });
            console.log(`Hive "${hiveName}" was successfully added`);
            console.log("Hive name =>", hiveName);
            // navigate("/hive/${id}")
            setHiveName("");
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    return (
        <main>
            <h1>Create a new hive</h1>
            <p>Let’s create a new hive for all your gift ideas!</p>
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
    )
}
