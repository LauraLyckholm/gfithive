import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { Button } from "../../components/elements/Button/Button";
import { customSwal } from "../../mixins/swalMixins";

export const Account = () => {
    const { deleteUser, setIsLoggedIn } = useUserStore();
    // const { updateUser, deleteUser, setIsLoggedIn } = useUserStore();
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    // const handleUpdateUsername = async () => {
    //     const { value: updatedUsername } = await customSwal.fire({
    //         title: "Update username",
    //         input: "text",
    //         inputLabel: "New username",
    //         inputValue: username,
    //         confirmButtonText: "Save",
    //         showCancelButton: true,
    //         inputValidator: (value) => {
    //             if (!value) {
    //                 return "You need to write something!";
    //             }
    //         },
    //     },
    //     );

    //     if (updatedUsername) {
    //         try {
    //             await updateUser(updatedUsername, null, userId);
    //             navigate("/account");
    //         } catch (error) {
    //             console.error("There was an error =>", error);
    //         }
    //     }
    // };

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

    return (
        <section>
            <h1>My account</h1>
            <div className="form-group">
                <h2>Personal information</h2>
                <p>Username: {username}</p>
                <div className="btns">
                    {/* <Button className={"primary"} handleOnClick={handleUpdateUsername} btnText={"Change username"} /> */}
                    <Button className={"primary"} handleOnClick={handleRemoveUser} btnText={"Remove account"} />
                </div>
            </div>
        </section>
    )
}
