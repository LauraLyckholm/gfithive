import { useUserStore } from "../../../stores/useUserStore";
import { Button } from "../../../components/elements/Button/Button";

export const UpdateUserInfo = ({ userId }) => {
    const { updateUser, username, setUsername, password, setPassword } = useUserStore();

    const handleUpdateUserInfo = async () => {
        // Creates an object with the updated user info, empty values on default
        const updatedUserInfo = {};
        if (username) {
            updatedUserInfo.username = username;
        } // If the user has written a new username, it will be added to the object
        if (password) {
            updatedUserInfo.password = password
        } // If the user has written a new password, it will be added to the object

        await updateUser(userId, updatedUserInfo);

        // Update localStorage and possibly user state
        if (username) localStorage.setItem("username", username);
    };

    return (
        <section>
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="username">Change username</label>
                    <input
                        type="text"
                        id="username"
                        // placeholder="e.g. New phone"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Change password</label>
                    <input
                        type="password"
                        id="password"
                        // placeholder="e.g. christmas, 2023"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                <Button handleOnClick={handleUpdateUserInfo} className={"primary"} btnText={"Update my info"} />
            </form>


        </section>
    )
}
