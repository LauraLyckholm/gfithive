// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import { useGiftStore } from "../../../stores/useGiftStore";

export const CreateNewHive = () => {
    const { hiveName, setHiveName, addHive } = useGiftStore();
    const navigate = useNavigate();

    // const userId = localStorage.getItem("userId");

    const handleAddHive = async (event) => {
        event.preventDefault();

        try {
            const newHive = {
                name: hiveName
            };

            const createdHive = await addHive(newHive);
            console.log(createdHive);

            // if (createdHive) {
            //     const newGift = {
            //         gift: giftName,
            //         hiveId: createdHive._id,
            //     };
            //     await addGift(newGift);
            // }

            // console.log(`Gifts in hive ${hiveName} with hiveid ${createdHive}: ${gift}`);
            // navigate("/hive/${id}")
            setHiveName("");
            // setGiftname("");
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
