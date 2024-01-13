import { useEffect, useState } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import update from "../../assets/update.svg";
import { customSwal } from "../../utils/customSwal";
import trashcanIcon from "../../assets/trash.svg";
import dueIcon from "../../assets/due-icon.svg";
import shareIcon from "../../assets/share-icon-yellow.svg";
import Lottie from "lottie-react";
import loadingSpinner from "../../assets/loading-spinner.json";
import { formatTime } from "../../utils/formatTime";
import { Tooltip } from "@mui/material";
import "./hives.css";

// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/gift-routes/${endpoint}`;

// Component for the unique hive page
export const UniqueHive = () => {
    const { id } = useParams();
    const [hive, setHive] = useState(null);
    const { deleteGift, updateGift, shareHive } = useGiftStore();

    // Fetches the hives when the component mounts
    useEffect(() => {
        handleHiveFetch();
    }, []);

    const handleHiveFetch = async () => {
        try {
            const response = await fetch(withEndpoint(`hives/${id}`), {
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setHive(data);
            } else {
                console.error("Error fetching hive with that id");
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    // Function to handle the updating of the bought status using the updateGift function from the useGiftStore hook
    const handleSetAsBought = async (giftId, newBoughtStatus) => {
        try {
            await updateGift({ id: giftId, bought: newBoughtStatus });
        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    // Function to handle the updating of tags using the updateGift function from the useGiftStore hook
    const handleUpdateTags = async (giftId, tagToDelete) => {
        try {
            // Finds the gift that has the tags that should be updated
            const giftToUpdate = hive.gifts.find((gift) => gift._id === giftId);

            if (!giftToUpdate) {
                throw new Error("Gift not found");
            }

            // Filters out the tag that should be deleted
            const updatedTags = giftToUpdate.tags.filter(tag => tag !== tagToDelete);

            // Updates the gift with the new tags array
            await updateGift({ id: giftId, tags: updatedTags });
        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    // Function to handle the delete using the deleteGift function from the useGiftStore hook
    const handleDelete = async (giftId) => {
        const result = await customSwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        });

        if (result.isConfirmed) {
            try {
                await deleteGift(giftId);
                handleHiveFetch();
            } catch (error) {
                console.error("There was an error =>", error);
            }
        } else if (result.dismiss === customSwal.DismissReason.cancel) {
            customSwal.fire({
                title: "Cancelled",
                text: "Your gift is safe 🐝",
                icon: "error"
            });
        }
    };

    // Function that reacts to the "Enter" key being pressed, for accessibility
    const handleKeyPress = async (event, action, giftId) => {
        // Checks if "Enter" key is pressed
        if (event.key === "Enter") {
            // If the action is update, the handleUpdateGift function will be called
            if (action === "delete") {
                await handleDelete(giftId);
                // If the action is delete, the handleDelete function will be called
            }
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

    // Function to handle the sharing of a hive
    const handleShare = async (hiveId) => {
        const result = await customSwal.fire({
            title: "Share your hive",
            input: "email",
            inputLabel: "To whom would you like to share your hive? (Email) 🐝",
            inputPlaceholder: "e.g. email@hives.com",
            confirmButtonText: "Share!",
            cancelButtonText: "Never mind..",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            },
        });

        if (result.isConfirmed) {
            try {
                // The email entered by the user is available in result.value
                await shareHive(hiveId, result.value);

                customSwal.fire({
                    title: "Shared!",
                    text: "Your hive has successfully been shared! 🐝",
                    icon: "success",
                });
            } catch (error) {
                customSwal.fire({
                    title: "Error!",
                    text: "Something went wrong, your hive could not be shared 🐝",
                    icon: "error",
                });
                console.error("There was an error =>", error);
            }
        }
    };

    return (
        <section>
            {/* If there is a hive recognized the user is shown the hives. */}
            {hive ? (
                <div>
                    <div className="unique-hive-heading">
                        <h1>Gift hive for {hive.name}</h1>
                        <Tooltip title="Share your hive">
                            <img
                                onClick={() => handleShare(hive._id)} // If user clicks on the icon, the handleShare function will be called
                                tabIndex="0"
                                className="icon share-icon"
                                src={shareIcon}
                                alt="Icon for sharing hives"
                            />
                        </Tooltip>
                    </div>
                    {hive.gifts.length === 0 ? "Empty hive, get started by adding a gift below!" :
                        hive.gifts.map((gift) => {
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
                                    <div className="icon-pair icon-pair-with-link">
                                        <Link to={`/hives/${id}/${gift._id}/update-gift`}>
                                            <Tooltip title="Update gift">
                                                <img
                                                    tabIndex="0"
                                                    className="icon update-icon"
                                                    src={update}
                                                    alt="Icon for updating the gift"
                                                />
                                            </Tooltip>
                                        </Link>
                                        <Tooltip title="Delete gift">
                                            <img
                                                tabIndex="0"
                                                className="icon"
                                                src={trashcanIcon}
                                                alt="Trashcan for deleting a hive"
                                                onClick={() => handleDelete(gift._id)}
                                                onKeyDown={((event) => handleKeyPress(event, "delete", gift._id))}
                                            />
                                        </Tooltip>
                                    </div>
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
                                </ul>
                            );
                        })
                    }
                </div>
            ) : (
                <Lottie animationData={loadingSpinner} className="spinner" />
            )}
            <div className="btns">
                <Link to={`/hives/${id}/add-gift`}><Button className="primary" btnText="Add gift" /></Link>
                <Link to="/hives"><Button className="secondary" btnText="Back to hives" /></Link>
            </div>
        </section>
    );
};