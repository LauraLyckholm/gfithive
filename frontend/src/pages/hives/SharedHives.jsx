import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
// import { Tooltip } from "@mui/material";
import update from "../../assets/update.svg";
import dueIcon from "../../assets/due-icon.svg";
import { Button } from "../../components/elements/Button/Button";
import { Chip, Stack, Tooltip, Avatar } from "@mui/material";
import { formatTime } from "../../utils/formatTime";
import "./hives.css";



export const SharedHives = () => {
    const { getHivesSharedToMe, hivesSharedToMe, updateGift, setHivesSharedToMe } = useGiftStore();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        getHivesSharedToMe(userId);
    }, [getHivesSharedToMe, userId]);

    const handleSetAsBought = async (giftId, newBoughtStatus) => {
        try {
            await updateGift({ id: giftId, bought: newBoughtStatus });
        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    const handleUpdateTags = async (giftId, tagToDelete) => {
        try {
            // Finds the gift that has the tags that should be updated
            let giftToUpdate;
            hivesSharedToMe.forEach((hive) => {
                if (hive.gifts) {
                    const foundGift = hive.gifts.find((gift) => gift._id === giftId);
                    if (foundGift) {
                        giftToUpdate = foundGift;
                    }
                }
            });

            if (!giftToUpdate) {
                throw new Error("Gift not found");
            }

            // Filters out the tag that should be deleted
            const updatedTags = giftToUpdate.tags.filter(tag => tag !== tagToDelete);

            // Updates the gift with the new tags array
            await updateGift({ id: giftId, tags: updatedTags });

            // Update local state
            const updatedHives = hivesSharedToMe.map(hive => {
                if (hive.gifts) {
                    return {
                        ...hive,
                        gifts: hive.gifts.map(gift => {
                            if (gift._id === giftId) {
                                return {
                                    ...gift,
                                    tags: updatedTags
                                };
                            }
                            return gift;
                        })
                    };
                }
                return hive;
            });

            // Assuming you have a setter for hivesSharedToMe, use it here
            setHivesSharedToMe(updatedHives);
            // Updates the gift with the new tags array
            await updateGift({ id: giftId, tags: updatedTags });
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

    return (

        <section>
            <div className="unique-hive-heading">
                <h1>Hives shared with me</h1>
            </div>
            {hivesSharedToMe.length > 0 ? (
                // <ul>
                <>
                    {hivesSharedToMe.map((hive, index) => {
                        // const overdueCount = countOverdueGifts(hive);
                        return (
                            <ul key={hive._id}>
                                <h3 className="bold">{index + 1}. {hive.name}</h3>
                                <li>{hive.gifts.map((gift) => {
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
                                                            onDelete={() => handleUpdateTags(gift._id, tag)}
                                                            sx={{
                                                                backgroundColor: "var(--primary)",
                                                                color: "var(--text)",
                                                                fontFamily: "var(--font)",
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Stack>
                                            <Link className="shared-update-icon" to={`/hives/${hive._id}/${gift._id}/update-shared-gift`}>
                                                <Tooltip title="Update gift">
                                                    <img
                                                        tabIndex="0"
                                                        className="icon update-icon"
                                                        src={update}
                                                        alt="Icon for updating the gift"
                                                    />
                                                </Tooltip>
                                            </Link>
                                        </ul>

                                    )
                                })}</li>
                            </ul>
                        );
                    })}
                    {/* </ul> */}
                </>
            ) : (
                <p>You have no hives shared with you</p>
            )}

            <div className="btns">
                <Link to="/dashboard"><Button className="primary" btnText="Back to dashboard" /></Link>
            </div>
        </section>
    );
}
