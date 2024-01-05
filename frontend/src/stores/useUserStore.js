import { create } from "zustand";
import { customSwal } from "../mixins/swalMixins";

// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/user-routes/${endpoint}`;

// Creates a store for the user handling
export const useUserStore = create((set, get) => ({

    // Saves some state variables in the store with default values
    username: "",
    password: "",
    accessToken: null,
    isLoggedIn: false,
    loadingUser: false,
    errorMessage: "",
    userId: "",
    dashboard: {},

    // Sets the values of the state variables to the values being passed in
    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setAccessToken: (accessToken) => set({ accessToken }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),
    setLoadingUser: (loadingUser) => set({ loadingUser: loadingUser }),
    setErrorMessage: (errorMessage) => set({ errorMessage: errorMessage }),
    setUserId: (userId) => set({ userId: userId }),
    setDashboard: (dashboard) => set({ dashboard: dashboard }),

    // Creates a function for getting the dashboard from the backend
    getDashboard: async () => {
        try {
            const response = await fetch(withEndpoint("dashboard"), {
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

            if (response.ok) {
                const data = await response.json();
                set({
                    dashboard: data
                });
            }
        } catch (error) {
            console.error("There was an error =>", error);
        }
    },



    // Creates a function for registering a user
    registerUser: async (username, password) => {
        // Checks if the username or password is empty, and if so, shows an error message
        if (!username || !password) {
            set({ errorMessage: "Please enter both username and password" });
            return;
        }

        // If the above check is passed, the registration process continues
        try {
            set({ loadingUser: true }); // Sets loading to true to show a loading indicator

            const response = await fetch(withEndpoint("register"), {
                method: "POST", // Uses the POST method
                headers: {
                    "Content-Type": "application/json",
                },
                // Sends the username and password in the body of the request
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            // If the response is not ok, throw an error
            if (!response.ok) {
                const data = await response.json();
                set({
                    loadingUser: false,
                    errorMessage: "Registration failed, please try again"
                })
                if (data.error) {
                    if (data.error.includes("unique")) {
                        set({ errorMessage: "Username already exists. Please choose another one." });
                    } else {
                        set({ errorMessage: data.error });
                    }
                }
                throw new Error(`${response.status} ${response.statusText}`);
            }

            // If the response is ok, saves the response as a variable called data
            const data = await response.json();
            const successfullFetch = data.success;

            // In case of a successfull fetch, sets the state variables to the values from the response
            if (successfullFetch) {
                set({
                    username: username,
                    loadingUser: false,
                })
            }

            // Alerts to the user that the username has been registered
            if (successfullFetch) {
                customSwal.fire({
                    title: "Welcome to Gifthive!",
                    text: `The user ${data.response.username} has been created - time to log in 😍!`,
                    icon: "success",
                    confirmButtonText: "Log in!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirect or navigate to the login page when the "Log in" button is clicked
                        window.location.href = "/login"; // Change the URL as needed
                    }
                });
            }

        } catch (error) {
            // If something goes wrong in the registration process, an error is thrown and the fields are set to empty
            set({
                username: "",
                password: "",
                loadingUser: false,
                errorMessage: "Username already exists, please choose another one"
            })
            console.error("There was an error =>", error);
        }
    },

    // Creates a function for logging in a user
    loginUser: async (username, password, userId) => {
        // Checks if the username or password is empty, and if so, alerts the user and returns
        if (!username || !password) {
            set({ errorMessage: "Please enter both username and password" });
            return;
        }

        try {
            set({ loadingUser: true });

            const response = await fetch(withEndpoint("login"), {
                method: "POST", // Uses the POST method
                headers: {
                    "Content-Type": "application/json",
                },
                // Sends the username and password in the body of the request
                body: JSON.stringify({
                    username,
                    password,
                    userId
                }),
            });

            // If the response is not ok, throw an error
            if (!response.ok) {
                set({ loadingUser: false });

                if (response.status === 401) {
                    // Unauthorized error
                    set({ errorMessage: "Wrong username or password, please try again" });
                } else if (response.status === 404) {
                    // User not found error
                    set({ errorMessage: "Username not found, please try again" });
                } else {
                    // Other errors
                    set({ errorMessage: "Something went wrong, please try again" });
                }

                throw new Error(`${response.status} ${response.statusText}`);
            }

            // If the response is ok, saves the response as a variable called data
            const data = await response.json();
            const successfullFetch = data.success;

            // In case of a successfull fetch, sets the state variables to the values from the response
            if (successfullFetch) {
                set({
                    username: username,
                    accessToken: data.response.accessToken,
                    isLoggedIn: true,
                    loadingUser: false,
                    userId: data.response._id,
                })
                // Saves the accessToken in localStorage
                localStorage.setItem("accessToken", data.response.accessToken);
                localStorage.setItem("username", username);
                localStorage.setItem("userId", data.response._id);
                localStorage.setItem("isLoggedIn", true);

            } else {
                set({
                    username: "",
                    accessToken: null,
                    isLoggedIn: false,
                    loadingUser: false,
                    errorMessage: "Login failed, please try again"
                });
            }

            // Logs a response to the console
            console.log(data.response.username, get().isLoggedIn ? "is logged in" : "is not logged in");

        } catch (error) {
            if (error.message == 401) {
                set({
                    username: "",
                    password: "",
                    loadingUser: false,
                    errorMessage: "Wrong username or password, please try again"
                })
            } else if (error.message == 404) {
                set({
                    username: "",
                    password: "",
                    loadingUser: false,
                    errorMessage: "Username not found, please try again"
                })
            }
            console.error("There was an error =>", error);
        }
    },

    // Creates a function for logging out a user
    logoutUser: () => {
        // Removes the accessToken from the store and sets isLoggedIn to false. Also empties the username and password fields
        set({
            username: "",
            password: "",
            accessToken: null,
            isLoggedIn: false,
            userId: "",
        });
        // Removes the accessToken from localStorage
        localStorage.clear();
    },

    // Creates a function that makes it possible to update a username and password
    updateUser: async (userId, updatedUserInfo) => {
        try {
            // Destructures username from the updatedUserInfo object
            const { username } = updatedUserInfo;

            const response = await fetch(withEndpoint(`users/${userId}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify(updatedUserInfo),
            });

            if (response.ok) {
                const data = await response.json();
                const successfullFetch = data.success;

                if (successfullFetch) {
                    set({
                        username: username,
                        loadingUser: false,
                    })
                }

                localStorage.setItem("username", username);

                // Alerts to the user that the username has been updated
                if (successfullFetch) {
                    customSwal.fire({
                        title: "Username updated",
                        text: `Your username has been updated to ${data.response.username}!`,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Redirect or navigate to the login page when the "OK" button is clicked
                            window.location.href = "/dashboard"; // Change the URL as needed
                        }
                    });
                }

            } else {
                console.error("Error updating username");
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            customSwal.fire({
                title: "Username update failed",
                text: `${error}`,
                icon: "error",
                confirmButtonText: "OK",
            });
            console.error("There was an error =>", error);
        }
    },

    // Creates a function for deleting a user
    deleteUser: async (userId) => {
        try {
            // Makes a DELETE request to the backend to remove a user
            await fetch(withEndpoint(`users/${userId}`), {
                method: "DELETE",
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

            // // Removes the deleted user from the store
            // set((state) => ({
            //     users: state.users.filter((user) => user._id !== userId),
            // }));

            // // Here I call the getUsers function to update the users in the store
            // await get().getUsers();

            customSwal.fire({
                title: "User deleted",
                icon: "success",
                confirmButtonText: "OK",
            }); // Shows a confirmation message to the user

        } catch (error) {
            console.error("Error deleting user:", error);
        }
    },

    // Function to check if there's a stored token in localStorage, to allow for refresh of secret page
    initAuth: () => {
        const storedToken = localStorage.getItem("accessToken");

        if (storedToken) {
            set({
                accessToken: storedToken,
                isLoggedIn: true,
            });
        }
    },
}));

// Initialize authentication when the store is created
const userStore = useUserStore.getState();
userStore.initAuth();

export default userStore;