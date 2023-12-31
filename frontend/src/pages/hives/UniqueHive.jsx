import { useEffect, useState } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import trashcanIcon from "../../assets/trash.svg";


// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/gift-routes/${endpoint}`;

export const UniqueHive = () => {
    const { id } = useParams();
    const [hive, setHive] = useState(null);
    const { getHives, deleteGift } = useGiftStore();

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

        // Call the fetchMovie function when the component mounts or when "id" changes
        // The "id" parameter is included as a dependency in the array to trigger a re-fetch, useEffect will be called when "id" changes.
        handleHiveFetch();
    }, [id, hive]);

    const handleDelete = async (hiveId) => {

        try {
            await deleteGift(hiveId);
            getHives();
        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    return (
        <section>
            {hive && hive.gifts ? (
                <div>
                    <h2>{hive.name}</h2>
                    {hive.gifts.map((gift) => {
                        return (
                            <ul className="list-item-pair" key={gift._id}>
                                <li>{gift.gift}</li>
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

