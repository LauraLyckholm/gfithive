import { useState } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import trashcanIcon from "../../assets/trash.svg";
import "./hives.css";
import { useEffect } from "react";

export const Hives = () => {
    const { getHives, deleteHive, getGifts } = useGiftStore();
    const [giftsInHive, setGiftsInHive] = useState([]);

    const savedHives = JSON.parse(localStorage.getItem("hives"));

    const handleGetHiveGifts = async () => {
        for (let i = 0; i < savedHives.length; i++) {
            setGiftsInHive(getGifts(savedHives[i]._id))
        }
        console.log(giftsInHive);
    }

    useEffect(() => {
        handleGetHiveGifts();
    }, []);



    // const hiveId = savedHives._id;
    // console.log(hiveId);

    // const gifts = getGifts(savedHives._id);
    // console.log(gifts);

    // Function to handle the delete using the deleteHive function from the useGiftStore hook
    const handleDelete = async (hiveId) => {
        try {
            await deleteHive(hiveId);
            getHives();
        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    return (
        <div>
            <h1>Hives</h1>
            <ul>
                {savedHives.map((hive) => {
                    return (
                        <li className="list-item-pair" key={hive._id}>
                            <Link to={`/hives/${hive._id}`}><p>{hive.name}</p></Link>
                            <p className="italic-text">{giftsInHive.length} gifts</p>
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
    )
}
