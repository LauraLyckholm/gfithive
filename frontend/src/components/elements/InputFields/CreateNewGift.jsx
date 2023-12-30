
import { Button } from "../Button/Button";
import { useGiftStore } from "../../../stores/useGiftStore";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateNewGift = () => {
    const { giftName, setGiftName, addGift } = useGiftStore();
    const { id } = useParams();
    const hiveId = id;

    // const userId = localStorage.getItem("userId");

    const handleAddGift = async (event) => {
        event.preventDefault();

        try {
            const newGift = {
                gift: giftName,
            };

            const createdGift = await addGift(newGift, hiveId);
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
            Swal.fire({
                title: "Weee!",
                text: "Gift successfully added! 🎁",
                icon: "success",
                confirmButtonText: "Let's add another!"
            })
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    return (
        <div>
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="giftName">Gift</label>
                    <input
                        type="text"
                        id="giftName"
                        placeholder="e.g. New phone"
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
                        // value={tags}
                        // onChange={(e) => setTags(e.target.value)}
                        required />
                </div>
            </form>

            <Button handleOnClick={handleAddGift} className={"primary"} btnText={"Add gift"} />
        </div>
    )
}