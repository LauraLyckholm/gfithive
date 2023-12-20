import { useGiftStore } from "../../stores/useGiftStore";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import trashcanIcon from "../../assets/trash.svg";
import update from "../../assets/update.svg"
import "./hives.css";

export const Hives = () => {
    const { getHives, deleteHive, updateHiveName } = useGiftStore();

    const savedHives = JSON.parse(localStorage.getItem("hives"));

    const showGiftAmount = () => savedHives.map((hive) => {
        const numberOfGifts = hive.gifts.length
        return numberOfGifts;
    })

    const handleUpdateHiveName = async (hiveId) => {
        const newHiveName = prompt("Enter new hive name");

        if (newHiveName) {
            try {
                await updateHiveName({ id: hiveId, name: newHiveName });
                getHives();
            } catch (error) {
                console.error("There was an error =>", error);
            }
        }
    }

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
                            <img className="icon" src={update} alt="Icon for updating the hives name" onClick={() => handleUpdateHiveName(hive._id)} />
                            <Link to={`/hives/${hive._id}`}><p className="bold">{hive.name}</p></Link>
                            <p className="italic-text">{showGiftAmount()} gifts</p>
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
    )
}
