import { useGiftStore } from "../../stores/useGiftStore";
import { Link } from "react-router-dom";
import { Button } from "../../components/elements/Button/Button";
import trashcanIcon from "../../assets/trash.svg";
import update from "../../assets/update.svg"
import "./hives.css";
import Swal from "sweetalert2";

export const Hives = () => {
    const { getHives, deleteHive, updateHiveName } = useGiftStore();

    const savedHives = JSON.parse(localStorage.getItem("hives"));
    console.log(savedHives);

    const showGiftAmount = (hive) => {
        const numberOfGifts = hive.gifts.length;
        console.log(numberOfGifts);
        return numberOfGifts;
    };

    const handleUpdateHiveName = async (hiveId) => {
        // const newHiveName = prompt("Enter new hive name");
        const { value: newHiveName } = await Swal.fire({
            title: "Update hive name",
            input: "text",
            inputLabel: "What would you like to change your hives name to be(e)? 🐝",
            inputPlaceholder: "e.g. Mom",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            },
        });

        if (newHiveName) {
            try {
                await updateHiveName({ id: hiveId, name: newHiveName });
                getHives();
            } catch (error) {
                console.error("There was an error =>", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        }
    };

    // Function to handle the delete using the deleteHive function from the useGiftStore hook
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
                    deleteHive(hiveId);
                    getHives();
                } catch (error) {
                    console.error("There was an error =>", error);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    "Cancelled",
                    "Your hive is safe 🐝",
                    "error"
                )
            }
        });
    };

    return (
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
    )
}
