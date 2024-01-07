import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { Button } from "../../components/elements/Button/Button";
import { customSwal } from "../../mixins/swalMixins";
import { UpdateUserInfo } from "../../components/elements/InputFields/UpdateUserInfo";
import "./account.css";

export const Account = () => {
    const { deleteUser, setIsLoggedIn, username } = useUserStore();
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleRemoveUser = async () => {
        try {
            await customSwal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover your account!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete my account!",
                cancelButtonText: "No, keep my account",
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser(userId);
                    customSwal.fire(
                        "Deleted!",
                        "Your account has been deleted.",
                        "success"
                    );
                    // Clears session data
                    localStorage.clear();
                    // Updates isLoggedIn state
                    setIsLoggedIn(false);
                    navigate("/");
                }
            });
        } catch (error) {
            console.error("There was an error =>", error);
        }
    };

    const handleKeyPress = async (event, action) => {
        // Checks if "Enter" key is pressed
        if (event.key === "Enter") {
            // If the action is update, the handleUpdateGift function will be called
            if (action === "remove") {
                handleRemoveUser();
            }
        }
    };

    return (
        <section className="account-page">
            <h1>My account</h1>
            <div className="heading-pair">
                <h2>Personal information</h2>
                <p>Username: {username}</p>
            </div>
            <UpdateUserInfo userId={userId} />
            <div className="btns"
                onKeyDown={(event) => handleKeyPress(event, "remove")}
            >
                {/* <Button className={"primary"} handleOnClick={handleUpdateUsername} btnText={"Change username"} /> */}
                <Button
                    className={"secondary"}
                    handleOnClick={handleRemoveUser}
                    btnText={"Remove account"} />
            </div>
        </section>
    )
}
