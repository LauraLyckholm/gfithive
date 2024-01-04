import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import trashcanIcon from "../../assets/trash.svg";
import update from "../../assets/update.svg"
import "./hives.css";
import { customSwal } from "../../mixins/swalMixins";
import Lottie from "lottie-react";
import loadingSpinner from "../../assets/loading-spinner.json";

// Component for the hives page, that displays all the users hives
export const Hives = () => {
    const { getHives, deleteHive, updateHiveName } = useGiftStore();
    const { loading } = useUserStore();

    // Saves the hives from the local storage in a variable
    const savedHives = JSON.parse(localStorage.getItem("hives"));

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
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
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
                    getHives();
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

    return (
        <>
            {loading ? <Lottie animationData={loadingSpinner} className="spinner" /> :
                <div>
                    <h1>Hives</h1>
                    <ul>
                        {savedHives.map((hive) => {
                            return (
                                <li className="grid-list-items" key={hive._id}>
                                    <img className="icon" src={update} alt="Icon for updating the hives name" onClick={() => handleUpdateHiveName(hive._id)} />
                                    <Link to={`/hives/${hive._id}`}><p className="bold">{hive.name}</p></Link>
                                    <p className="italic-text">{showGiftAmount(hive)} gifts</p>
                                    <p className="italic-text disabled">0 due</p>
                                    <img className="icon" src={trashcanIcon} alt="Trashcan for deleting a hive" onClick={() => handleDelete(hive._id)} />
                                </li>
                            );
                        })}

                    </ul>
                    <div className="btns">
                        <Link to="/add-hive"><Button className="primary" btnText="Add hive" /></Link>
                        <Link to="/dashboard"><Button className="secondary" btnText="Back to dashboard" /></Link>
                    </div>
                </div>
            }
        </>
    )
}
