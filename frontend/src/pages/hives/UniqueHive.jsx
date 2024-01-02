import { useEffect, useState } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import update from "../../assets/update.svg"
import Swal from "sweetalert2";
import trashcanIcon from "../../assets/trash.svg";


// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/gift-routes/${endpoint}`;

export const UniqueHive = () => {
    const { id } = useParams();
    const [hive, setHive] = useState(null);
    const { getHives, deleteGift, updateGift } = useGiftStore();

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

                    // localStorage.setItem(`uniqueHiveData_${data._id}`, JSON.stringify(data));
                } else {
                    console.error("Error fetching hive with that id");
                }

            } catch (error) {
                console.error("There was an error =>", error);
            }
        };
        handleHiveFetch();
    }, [id, hive]);

    const handleUpdateGift = async (giftId) => {
        // const newHiveName = prompt("Enter new hive name");
        const { value: updatedGift } = await Swal.fire({
            title: "Update gift",
            input: "text",
            inputLabel: "What would you like to change your gifts name to be(e)? 🐝",
            inputPlaceholder: "e.g. Mom",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            },
        });

        if (updatedGift) {
            try {
                await updateGift({ id: giftId, gift: updatedGift, tags: [], bought: false });
                getHives();
            } catch (error) {
                console.error("There was an error =>", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        }
    };

    const handleDelete = async (hiveId) => {
        Swal.fire({
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelled",
                    text: "Your gift is safe 🐝",
                    icon: "error"
                })
            }
        });
    };

    return (
        <section>
            {hive && hive.gifts ? (
                <div>
                    <h1>{hive.name}</h1>
                    {hive.gifts.map((gift) => {
                        return (
                            <ul className="list-item-pair" key={gift._id}>
                                <li>{gift.gift}</li>
                                <img className="icon" src={update} alt="Icon for updating the hives name" onClick={() => handleUpdateGift(gift._id)} />
                                <img className="icon" src={trashcanIcon} alt="Trashcan for deleting a hive" onClick={() => handleDelete(gift._id)} />
                            </ul>
                        );
                    })}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="btns">
                <Link to={`/hives/${id}/add-gift`}><Button className="primary" btnText="Add gift" /></Link>
                <Link to="/hives"><Button className="secondary" btnText="Back to hives" /></Link>
            </div>
        </section>
    );
};

