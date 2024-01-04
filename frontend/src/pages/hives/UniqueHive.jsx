import { useEffect, useState } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import update from "../../assets/update.svg";
import { customSwal } from "../../mixins/swalMixins";
import trashcanIcon from "../../assets/trash.svg";
import Lottie from "lottie-react";
import loadingSpinner from "../../assets/loading-spinner.json";

// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/gift-routes/${endpoint}`;

// Component for the unique hive page
export const UniqueHive = () => {
    const { id } = useParams();
    const [hive, setHive] = useState(null);
    const { getHives, deleteGift, updateGift } = useGiftStore();

    // Fetches the hives when the component mounts, and saves the data to a local state for the hives
    useEffect(() => {
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
        handleHiveFetch();
    }, [id, hive]);

    // Function to handle the update using the updateHiveName function from the useGiftStore
    const handleUpdateGift = async (giftId, currentGiftName) => {
        // Utilizes the SweetAlert2 library to display a popup with an input field
        const { value: updatedGift } = await customSwal.fire({
            title: "Update gift",
            input: "text",
            inputLabel: "What would you like to change your gifts name to be(e)? 🐝",
            inputValue: currentGiftName,
            confirmButtonText: "Save",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            },
        });

        // If the user has entered a new name for the gift, the gift will be updated
        if (updatedGift) {
            try {
                await updateGift({ id: giftId, gift: updatedGift });
                // await updateGift({ id: giftId, gift: updatedGift, tags: [], bought: false });
                getHives();
            } catch (error) {
                console.error("There was an error =>", error);
                customSwal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        }
    };

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
    const handleDelete = async (hiveId) => {
        customSwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteGift(hiveId);
                    getHives();
                } catch (error) {
                    console.error("There was an error =>", error);
                }
            } else if (result.dismiss === customSwal.DismissReason.cancel) {
                customSwal.fire({
                    title: "Cancelled",
                    text: "Your gift is safe 🐝",
                    icon: "error"
                })
            }
        });
    };

    return (
        <section>
            {/* If there is a hive recognized the user is shown the hives. */}
            {hive ? (
                <div>
                    <h1>Gift hive for {hive.name}</h1>
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
                                    <div className="icon-pair">
                                        <img className="icon" src={update} alt="Icon for updating the hives name" onClick={() => handleUpdateGift(gift._id, gift.gift)} />
                                        <img className="icon" src={trashcanIcon} alt="Trashcan for deleting a hive" onClick={() => handleDelete(gift._id)} />
                                    </div>
                                    <Stack
                                        className="tags"
                                        direction="row"
                                        spacing={1}
                                    >
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

