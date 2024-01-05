// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { useGiftStore } from "../../stores/useGiftStore";
import { customSwal } from "../../mixins/swalMixins";

export const CreateNewHive = () => {
    const { hiveName, setHiveName, addHive } = useGiftStore();
    const navigate = useNavigate();

    // function to handle adding a new hive
    const handleAddHive = async (event) => {
        event.preventDefault();

        try {
            const newHive = {
                name: hiveName
            };

            await addHive(newHive);

            // Alerts to the user that the hive has been created, awaits it so that the user isn't redicted before the alert is closed
            await customSwal.fire({
                title: "Weee!",
                text: "Hive successfully created! 🐝",
                icon: "success",
                confirmButtonText: "Back to my hives!",
            })
            setHiveName("");
            // Refreshes the page after adding a new hive
            navigate("/hives");
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    return (
        <div>
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
                <div className="form-group disabled">
                    <label htmlFor="gift">Create your first gift idea</label>
                    <input
                        type="text"
                        id="gift"
                        placeholder="e.g. Honey"
                        // value={giftName}
                        // onChange={(e) => setGiftname(e.target.value)}
                        required />
                </div>
                <div className="form-group disabled">
                    <label htmlFor="tags">Add tags (separated by comma)</label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="e.g. christmas, 2023"
                        // value={tags}
                        // onChange={(e) => setTags(e.target.value)}
                        required />
                </div>
            </form>
            <div className="btns">
                <Link to="/dashboard">
                    <Button handleOnClick={handleAddHive} className={"primary"} btnText={"Start a new hive"} />
                </Link>
                <Link to={`/hives`}>
                    <Button className={"secondary"} btnText={"Back to hives"} />
                </Link>
            </div>
        </div>
    )
}
