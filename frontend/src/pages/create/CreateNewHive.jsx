// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import { useGiftStore } from "../../stores/useGiftStore";
import { customSwal } from "../../mixins/swalMixins";
import "./create.css";

export const CreateNewHive = () => {
    const { hiveName, setHiveName, giftName, setGiftName, tagNames, setTagNames, addHive } = useGiftStore();
    const navigate = useNavigate();

    // Function to handle adding a new hive
    const handleAddHive = async (event) => {
        event.preventDefault();

        // Formats the tags so that they are saved as an array with several strings instead of one string. Filters out empty tags
        const formattedTags = typeof tagNames === "string" ?
            tagNames.split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== "")
            : [];

        try {
            const newHive = {
                name: hiveName,
                gift: giftName || null, // Gift is optional
                tags: formattedTags || null, // Tags are optional
            };

            const success = await addHive(newHive);

            console.log("success", success);
            console.log("newHive", newHive);

            if (success) {
                // Clear form fields
                setHiveName("");
                setGiftName("");
                setTagNames("");

                // Alert user and navigate
                await customSwal.fire({
                    title: "Weee!",
                    text: "Hive successfully created! 🐝",
                    icon: "success",
                    confirmButtonText: "Back to my hives!",
                });
                // Refreshes the page after adding a new hive
                navigate("/hives");
            }
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }


    return (
        <section className="create-section">
            <h1>Create a new hive</h1>
            <form className="form-wrapper" onSubmit={handleAddHive}>
                <div className="form-group">
                    <label htmlFor="hiveName">Hivename*</label>
                    <input
                        type="text"
                        id="hiveName"
                        placeholder="e.g. Mom"
                        value={hiveName}
                        onChange={(e) => setHiveName(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="gift">Create your first gift idea</label>
                    <input
                        type="text"
                        id="gift"
                        placeholder="e.g. Honey"
                        value={giftName}
                        onChange={(e) => setGiftName(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Add tags (separated by comma)</label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="e.g. christmas, 2023"
                        value={tagNames}
                        onChange={(e) => setTagNames(e.target.value)}
                        required />
                </div>
            </form>
            <div className="btns">
                <Button handleOnClick={handleAddHive} type="submit" className={"primary"} btnText={"Start a new hive"} />
                <Link to={`/hives`}>
                    <Button className={"secondary"} btnText={"Back to hives"} />
                </Link>
            </div>
        </section>
    )
}
