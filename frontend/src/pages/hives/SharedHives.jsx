import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
// import { Tooltip } from "@mui/material";
// import update from "../../assets/update.svg";
import dueIcon from "../../assets/due-icon.svg";
import { Button } from "../../components/elements/Button/Button";
import { Chip, Stack, Tooltip, Avatar } from "@mui/material";
import { formatTime } from "../../utils/formatTime";
import "./hives.css";



export const SharedHives = () => {
    const { getHivesSharedToMe, hivesSharedToMe, updateGift } = useGiftStore();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        getHivesSharedToMe(userId);
        // Removed the console.log here, it won't show updated data immediately
    }, [getHivesSharedToMe, userId]);

    const handleSetAsBought = async (giftId, newBoughtStatus) => {
        try {
            await updateGift({ id: giftId, bought: newBoughtStatus });
        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    // Function to handle showing the due date
    const handleDueDate = (gift) => {
        if (gift.dueDate !== null) {
            const formattedDueDate = formatTime(gift.dueDate);
            return formattedDueDate;
        } else (
            null
        )
    };

    console.log(hivesSharedToMe)

    return (

        <section>
            <div className="unique-hive-heading">
                <h1>Hives shared with me</h1>
            </div>
            {hivesSharedToMe.length > 0 ? (
                <ul>
                    {hivesSharedToMe.map((hive, index) => {
                        // const overdueCount = countOverdueGifts(hive);
                        return (
                            <li key={hive._id}>
                                <h3 className="bold">{index + 1}. {hive.name}</h3>
                                <p>{hive.gifts.map((gift) => {
                                    return (
                                        <ul className="list-item-pair" key={gift._id}>
                                            <div className="icon-pair">
                                                <label className="container">
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={gift.bought}
                                                        onClick={() => handleSetAsBought(gift._id, !gift.bought)}
                                                    />
                                                    <div className="checkmark"></div>
                                                </label>
                                                <li>{gift.gift}</li>

                                            </div>
                                            <div></div>
                                            <Stack
                                                className="tags"
                                                direction="row"
                                                spacing={1}
                                            >
                                                {gift.dueDate !== null ?
                                                    <Tooltip title="Due date">
                                                        <Chip

                                                            avatar={<Avatar alt="Due date icon" src={dueIcon} />}
                                                            variant="outlined"
                                                            label={handleDueDate(gift)}
                                                        />
                                                    </Tooltip>
                                                    : null
                                                }
                                                {gift.tags.map((tag) => {
                                                    return (
                                                        <Chip
                                                            key={tag}
                                                            label={tag}
                                                            // onDelete={() => handleUpdateTags(gift._id, tag)}
                                                            sx={{
                                                                backgroundColor: "var(--primary)",
                                                                color: "var(--text)",
                                                                fontFamily: "var(--font)",
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Stack>
                                        </ul>

                                    )
                                })}</p>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>You have no hives shared with you</p>
            )}

            <div className="btns">
                <Link to="/dashboard"><Button className="primary" btnText="Back to dashboard" /></Link>
            </div>
        </section>
    );
}
