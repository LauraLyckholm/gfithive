
import { Button } from "../Button/Button";
import { useGiftStore } from "../../../stores/useGiftStore";

export const CreateNewGift = () => {
    const { giftName, setGiftName, addGift } = useGiftStore();

    // const userId = localStorage.getItem("userId");

    const handleAddGift = async (event) => {
        event.preventDefault();

        try {
            const newGift = {
                name: giftName
            };

            const createdGift = await addGift(newGift);
            console.log(createdGift);

            // if (createdHive) {
            //     const newGift = {
            //         gift: giftName,
            //         hiveId: createdHive._id,
            //     };
            //     await addGift(newGift);
            // }

            // console.log(`Gifts in hive ${hiveName} with hiveid ${createdHive}: ${gift}`);
            // navigate("/hive/${id}")
            setGiftName("");
            // setGiftname("");
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
                        value={giftName}
                        onChange={(e) => setGiftName(e.target.value)}
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

            <Button handleOnClick={handleAddGift} className={"primary"} btnText={"Add gift"} />
        </div>
    )
}