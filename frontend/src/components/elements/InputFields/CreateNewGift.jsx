import { Button } from "../Button/Button";
import { useGiftStore } from "../../../stores/useGiftStore";
import { Link, useParams, useNavigate } from "react-router-dom";
import { customSwal } from "../../../mixins/swalMixins";

// Component for creating a new gift
export const CreateNewGift = () => {
    const { giftName, setGiftName, addGift } = useGiftStore();
    const { id } = useParams();
    const hiveId = id;
    const navigate = useNavigate();

    // function to handle adding a new gift
    const handleAddGift = async (event) => {
        event.preventDefault();

        try {
            const newGift = {
                gift: giftName,
            };
            await addGift(newGift, hiveId);

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
            // Alerts to the user that the gift has been created and gives them the choice to either add another gift or go back to their hive
            customSwal.fire({
                title: "Weee!",
                text: "Gift successfully added! 🎁",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Let's add another!",
                cancelButtonText: "Back to my hive",
            }).then((result) => {
                if (result.isConfirmed) {
                    setGiftName("");
                } else if (result.dismiss === customSwal.DismissReason.cancel) {
                    navigate(`/hives/${hiveId}`);
                }
            });
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
                <Button handleOnClick={handleAddGift} className={"primary"} btnText={"Add gift"} />
                <Link to={`/hives/${hiveId}`}>
                    <Button className={"secondary"} btnText={"Back to hive"} />
                </Link>
            </div>
        </div>
    )
}