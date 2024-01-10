import { Button } from "../../components/elements/Button/Button";
import { useGiftStore } from "../../stores/useGiftStore";
import { useParams, useNavigate } from "react-router-dom";
import { customSwal } from "../../mixins/swalMixins";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "./create.css";

export const UpdateGiftInfo = () => {
    const { giftName, setGiftName, updateGift, tags, setTags, dueDate, setDueDate } = useGiftStore();
    const { id, giftId } = useParams();
    const hiveId = id;
    const giftIdParam = giftId;
    const navigate = useNavigate();

    console.log("giftIdParam", giftIdParam);

    // Function to handle navigation back to the hive
    const handleOnclickNavigation = () => {
        navigate(`/hives/${hiveId}`)
    };

    // function to handle adding a new gift
    const handleUpdateGift = async (event) => {
        event.preventDefault();

        // Formats the tags so that they are saved as an array with several strings instead of one string. Filters out empty tags
        const formattedTags = typeof tags === "string" ?
            tags.split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== "")
            : [];

        const giftData = {
            id: giftIdParam,
            gift: giftName,
            tags: formattedTags,
            dueDate: dueDate,
        };

        // Check if the due date is in the past
        if (dueDate && dayjs(dueDate).isBefore(dayjs())) {
            customSwal.fire({
                title: "Oops...",
                text: "The due date must be in the future!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            await updateGift(giftData);
            setGiftName("");
            setTags("");
            setDueDate("");

            // Alerts to the user that the gift has been created and gives them the choice to either add another gift or go back to their hive
            customSwal.fire({
                title: "Weee!",
                text: "Gift successfully updated! 🎁",
                icon: "success",
                confirmButtonText: "Back to my hive!",
            }).then((result) => {
                if (result.isConfirmed) {
                    setGiftName("");
                    setTags("");
                    setDueDate("");
                    navigate(`/hives/${hiveId}`);
                }
            });
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    return (
        <section>
            <h1>Update gift</h1>
            <form className="form-wrapper" onSubmit={handleUpdateGift}>
                <div className="form-group">
                    <label htmlFor="giftName">Gift name</label>
                    <input
                        type="text"
                        id="giftName"
                        placeholder="e.g. New phone"
                        value={giftName}
                        onChange={(e) => setGiftName(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags (separated by comma)</label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="e.g. christmas, 2023"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due date</label>
                    <DatePicker
                        id="dueDate"
                        value={dueDate}
                        onChange={setDueDate}
                    // slots={{
                    //     openPickerIcon: EditCalendarRoundedIcon,
                    //     openPickerButton: StyledButton,
                    //     day: StyledDay,
                    // }}
                    // slotProps={{
                    //     openPickerIcon: { fontSize: "large" },
                    //     openPickerButton: { color: "secondary" },
                    //     textField: {
                    //         variant: "filled",
                    //         focused: true,
                    //         color: "secondary",
                    //     },
                    // }}
                    />
                </div>
            </form>

            <div className="btns">
                <Button handleOnClick={handleUpdateGift} className={"primary"} btnText={"Update gift"} />
                <Button className={"secondary"} handleOnClick={handleOnclickNavigation} btnText={"Back to hive"} />
            </div>
        </section>
    )
}
