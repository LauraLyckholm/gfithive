import { useUserStore } from "../../../stores/useUserStore";
import { Button } from "../../../components/elements/Button/Button";

export const UpdateUserInfo = ({ userId }) => {
    const { updateUser, username, setUsername, password, setPassword } = useUserStore();

    const handleUpdateUserInfo = async () => {
        // Creates an object with the updated user info, empty values on default
        const updatedUserInfo = {};
        // Only add username to the object if it's been provided and is different from the stored username
        if (username && username !== localStorage.getItem("username")) {
            updatedUserInfo.username = username;
        }
        if (password) {
            updatedUserInfo.password = password
        } // If the user has written a new password, it will be added to the object

        if (Object.keys(updatedUserInfo).length > 0) {
            await updateUser(userId, updatedUserInfo);

            // Update local storage and state if username was updated
            if (updatedUserInfo.username) {
                localStorage.setItem("username", updatedUserInfo.username);
                setUsername(updatedUserInfo.username);
            }
        }
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Change password</label>
                    <input
                        type="password"
                        id="password"
                        // placeholder="e.g. christmas, 2023"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button handleOnClick={handleUpdateUserInfo} className={"primary"} btnText={"Update my info"} />
            </form>


        </section>
    )
}
