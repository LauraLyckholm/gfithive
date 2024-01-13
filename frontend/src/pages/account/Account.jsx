import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { Button } from "../../components/elements/Button/Button";
import { customSwal } from "../../utils/customSwal";
import { UpdateUserInfo } from "../../components/elements/InputFields/UpdateUserInfo";
import "./account.css";

// Component for the account page
export const Account = () => {
    const { deleteUser, setIsLoggedIn } = useUserStore();
    const userId = localStorage.getItem("userId");
    const currentUsername = localStorage.getItem("username");
    const currentEmail = localStorage.getItem("email");
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

    // Function that reacts to the "Enter" key being pressed, for accessibility
    const handleKeyPress = async (event, action) => {
        // Checks if "Enter" key is pressed
        if (event.key === "Enter") {
            // If the action is update, the handleUpdateGift function will be called
            if (action === "back") {
                navigate("/dashboard");
            }
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
                <p>Username: {currentUsername}</p>
                <p>Email: {currentEmail}</p>
            </div>
            <div className="account-btns">
                <UpdateUserInfo userId={userId} />
                <Link to={`/dashboard`}>
                    <Button className={"primary"} btnText={"Back to the dashboard"} onKeyDown={(event) => handleKeyPress(event, "back")} />
                </Link>
                <Button
                    className={"secondary"}
                    onKeyDown={(event) => handleKeyPress(event, "remove")}
                    handleOnClick={handleRemoveUser}
                    btnText={"Want to remove your account?"} />
            </div>
        </section>
    )
}
