import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";
import { Link, useNavigate } from "react-router-dom";
import trashcanIcon from "../../assets/trash.svg";
import update from "../../assets/update.svg"
import "./hives.css";
import { customSwal } from "../../mixins/swalMixins";
import { useEffect } from "react";

// Component for the list of hives, that gets rendered on /hives
export const HiveListComponent = () => {
    const { getHives, deleteHive, updateHiveName } = useGiftStore();
    const { dashboard } = useUserStore();
    const hivesAmount = dashboard.hivesCount; // Saves the amount of hives in a variable

    const navigate = useNavigate();

    // Saves the hives from the local storage in a variable
    const savedHives = JSON.parse(localStorage.getItem("hives"));

    useEffect(() => {
        getHives();
    }, [getHives]);

    // Function to show the amount of gifts in each hive
    const showGiftAmount = (hive) => {
        const numberOfGifts = hive.gifts.length;
        return numberOfGifts;
    };

    // Function to handle the updating of a hive name using the updateHiveName function from the useGiftStore
    const handleUpdateHiveName = async (hiveId) => {
        // Utilizes the SweetAlert2 library to display a popup with an input field
        const { value: newHiveName } = await customSwal.fire({
            title: "Update hive name",
            input: "text",
            inputLabel: "What would you like to change your hives name to be(e)? 🐝",
            inputPlaceholder: "e.g. Mom",
            confirmButtonText: "Save",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            },
        });

        // If the user writes something in the input field, the updateHiveName function will be called
        if (newHiveName) {
            try {
                await updateHiveName({ id: hiveId, name: newHiveName });
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

    // Function to handle the delete using the deleteHive function from the useGiftStore hook
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
                    deleteHive(hiveId);

                    // If there aren't any hives left, the user is redirected to the dashboard
                    if (hivesAmount === 0) {
                        navigate("/");
                    } else {
                        getHives();
                    }


                } catch (error) {
                    console.error("There was an error =>", error);
                }
            } else if (result.dismiss === customSwal.DismissReason.cancel) {
                customSwal.fire(
                    "Cancelled",
                    "Your hive is safe 🐝",
                    "error"
                )
            }
        });
    };

    // Function that reacts to the "Enter" key being pressed, for accessibility
    const handleKeyPress = (event, action, hiveId) => {
        // Checks if "Enter" key is pressed
        if (event.key === "Enter") {
            // If the action is update, the handleUpdateHiveName function will be called
            if (action === "update") {
                handleUpdateHiveName(hiveId);
                // If the action is delete, the handleDelete function will be called
            } else if (action === "delete") {
                handleDelete(hiveId);
            }
        }
    };

    return (
        <>
            <ul>
                {savedHives.map((hive) => {
                    return (
                        <li className="grid-list-items" key={hive._id}>
                            <img
                                tabIndex="0"
                                className="icon"
                                src={update}
                                alt="Icon for updating the hives name"
                                onClick={() => handleUpdateHiveName(hive._id)} // If user clicks on the icon, the handleUpdateHiveName function will be called
                                onKeyDown={(event) => handleKeyPress(event, "update", hive._id)} // If user presses "Enter" on the icon, the handleUpdateHiveName function will be called
                            />
                            <Link to={`/hives/${hive._id}`}>
                                <p className="bold">{hive.name}</p>
                            </Link>
                            <p className="italic-text">{showGiftAmount(hive)} gifts</p>
                            <p className="italic-text disabled">0 due</p>
                            <img
                                tabIndex="0"
                                className="icon"
                                src={trashcanIcon}
                                alt="Trashcan for deleting a hive"
                                onClick={() => handleDelete(hive._id)} // If user clicks on the icon, the handleDelete function will be called
                                onKeyDown={(event) => handleKeyPress(event, "delete", hive._id)} // If user presses "Enter" on the icon, the handleDelete function will be called
                            />
                        </li>
                    );
                })}

            </ul>
        </>
    )
}
