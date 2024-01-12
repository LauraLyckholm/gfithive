import { Button } from "../../components/elements/Button/Button";
import { useGiftStore } from "../../stores/useGiftStore";
import { useParams, useNavigate } from "react-router-dom";
import { customSwal } from "../../utils/customSwal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import "./create.css";

export const UpdateSharedGiftInfo = () => {
    const { giftName, setGiftName, updateGift, tags, setTags, dueDate, setDueDate } = useGiftStore();
    const { giftId } = useParams();
    // const hiveId = id;
    const giftIdParam = giftId;
    const navigate = useNavigate();

    // Function to handle navigation back to the hive
    const handleOnclickNavigation = () => {
        navigate(`/shared-hives`)
    };

    // function to handle adding a new gift
    const handleUpdateGift = async (event) => {
        event.preventDefault();

        let giftData = {
            id: giftIdParam,
        };

        if (giftName.trim()) {
            giftData.gift = giftName;
        }

        // Check if tags is a string and not empty before splitting and trimming
        if (typeof tags === "string" && tags.trim()) {
            giftData.tags = tags.split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== "");
        }

        if (dueDate && !dayjs(dueDate).isBefore(dayjs())) {
            giftData.dueDate = dueDate;
        } else if (dueDate) {
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
                    navigate(`/shared-hives`);
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
                        placeholder="e.g. Christmas, 2024 "
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due date</label>
                    <DatePicker
                        className="customDatePickerInput"
                        id="dueDate"
                        value={dueDate}
                        onChange={setDueDate}
                        slots={{
                            openPickerIcon: EditCalendarRoundedIcon
                        }}
                        slotProps={{
                            openPickerIcon: { fontSize: "large" },
                            openPickerButton: { color: "var(--primary)" },
                            textField: {
                                textfield: {
                                    variant: "outlined",
                                    focused: true,
                                },
                                inputProps: {
                                    style: {
                                        background: "white",
                                        border: "none",
                                        padding: "30px",
                                        fontSize: "18px",
                                        fontFamily: "Poppins",
                                        fontWeight: "400",
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </form>

            <div className="btns">
                <Button handleOnClick={handleUpdateGift} className={"primary"} btnText={"Update gift"} />
                <Button className={"secondary"} handleOnClick={handleOnclickNavigation} btnText={"Back to shared hives"} />
            </div>
        </section>
    )
}
