import { useUserStore } from "../../stores/useUserStore";
import { Button } from "../../components/elements/Button/Button";
import { customSwal } from "../../mixins/swalMixins";

export const Account = () => {
    const { updateUser } = useUserStore();
    const username = localStorage.getItem("username");

    const handleUpdateUsername = async (userId, username) => {
        const { value: updatedUsername } = await customSwal.fire({
            title: "Update username",
            input: "text",
            inputLabel: "New username",
            inputValue: username,
            confirmButtonText: "Save",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            },
        });

        if (updatedUsername) {
            try {
                await updateUser({ id: userId, username: updatedUsername });
            } catch (error) {
                console.error("There was an error =>", error);
                customSwal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        }
        console.log("Update username");
    };


    return (
        <section>
            <h1>My account</h1>
            <div className="form-group">
                <h2>Personal information</h2>
                <p>Username: {username}</p>
                <Button className={"primary"} handleOnClick={handleUpdateUsername} btnText={"Change username"} />
            </div>
        </section>
    )
}
