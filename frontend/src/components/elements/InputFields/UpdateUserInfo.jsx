import { useUserStore } from "../../../stores/useUserStore";
import { Button } from "../../../components/elements/Button/Button";

export const UpdateUserInfo = ({ userId }) => {
    const { updateUser, username, setUsername, password, setPassword, email, setEmail } = useUserStore();

    const handleUpdateUserInfo = async () => {
        // Creates an object with the updated user info, empty values on default
        const updatedUserInfo = {};
        // Only add username to the object if it's been provided and is different from the stored username
        if (username && username !== localStorage.getItem("username")) {
            updatedUserInfo.username = username;
        }
        // If the user has written a new password, it will be added to the object
        if (password) {
            updatedUserInfo.password = password
        }
        // If the user has written a new email, it will be added to the object
        if (email) {
            updatedUserInfo.email = email
        }

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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Change password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Change email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <Button handleOnClick={handleUpdateUserInfo} className={"primary"} btnText={"Update my info"} />
            </form>


        </section>
    )
}
