import { create } from "zustand";

// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/gift-routes/${endpoint}`;

// Creates a store for the gift hive handling
export const useGiftStore = create((set, get) => ({

    // Saves some state variables in the store with default values
    gifts: [],
    hives: [],
    hiveName: "",
    giftName: "",
    tagNames: [],
    bought: false,
    tags: [],
    loadingHives: false,
    dueDate: null,
    hivesSharedToMe: [],

    setGifts: (gifts) => set({ gifts }),
    setHives: (hives) => set({ hives }),
    setHiveName: (hiveName) => set({ hiveName }),
    setGiftName: (giftName) => set({ giftName }),
    setTagNames: (tagNames) => set({ tagNames }),
    setBought: (bought) => set({ bought }),
    setTags: (tags) => set({ tags }),
    setLoadingHives: (loadingHives) => set({ loadingHives }),
    setDueDate: (dueDate) => set({ dueDate }),
    setHivesSharedToMe: (hivesSharedToMe) => set({ hivesSharedToMe }),

    // Function for getting all hives from the backend
    getHives: async () => {
        set({ loadingHives: true })
        try {
            const response = await fetch(withEndpoint("hives"), {
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

            if (response.ok) {
                const data = await response.json();

                set({
                    hives: data,
                    loadingHives: false,
                });
                localStorage.setItem("hives", JSON.stringify(data)); // Saves the hives data to local storage
            } else {
                console.error("Error fetching hives");
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },

    // Function for adding a gift
    addGift: async (newGift, hiveId) => {
        try {
            // Creates an object with the gift data and the hiveId
            const giftData = {
                ...newGift,
                hiveId: hiveId
            };

            // Makes a POST request to the backend to create a new gift
            const response = await fetch(withEndpoint("gifts"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify(giftData), // Sends the data in the body of the request
            });

            const data = await response.json();

            // If the request is successful, the gift is added to the store
            if (response.ok) {
                set((state) => ({
                    gifts: [...state.gifts, data]
                }));
                // If the request is not successful, an error is logged to the console    
            } else if (!response.ok) {
                console.error("Error adding gift:", data);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },


    // Function for adding a hive
    addHive: async (newHive) => {
        try {
            // Makes a POST request to the backend to create a new hive
            const response = await fetch(withEndpoint("hives"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify(newHive), // Sends the data in the body of the request
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create hive");
            }

            // If the request is successful, the hive is added to the store
            const data = await response.json();

            const newHiveData = data.hive || data;
            set((state) => ({
                hives: [...state.hives, newHiveData],
            }));

            // Here I call the getHives function to update the hives in the store
            await get().getHives();

            return true; // Indicates success

        } catch (error) {
            console.error("Error creating hive:", error);
            return false; // Indicates failure
        }
    },

    // Function for updating a gift
    updateGift: async (updatedGift) => {
        try {
            // Makes a PUT request to the backend to update an existing gift
            const response = await fetch(withEndpoint(`gifts/${updatedGift.id}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify(updatedGift),
            });

            const data = await response.json();

            // If the request is successful, the gift is updated in the store
            if (response.ok) {
                set((state) => ({
                    gifts: state.gifts.map((gift) =>
                        gift.id === updatedGift.id ? { ...gift, ...data } : gift
                    ), // I map over each gift in the store and update the state of the gift with the matching id
                }));
                // If the request is not successful, an error is logged to the console
            } else {
                console.error("Error updating gift");
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },

    updateHiveName: async (updatedHive) => {
        try {
            // Makes a PUT request to update an existing hive
            const response = await fetch(withEndpoint(`hives/${updatedHive.id}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify(updatedHive),
            });

            const data = await response.json();

            // If the request is successful, the hive name is updated in the store
            if (response.ok) {
                set((state) => ({
                    hives: state.hives.map((hive) =>
                        hive.id === updatedHive.id ? { ...hive, ...data } : hive // I map over each hive in the store and update the state of the hive with the matching id
                    ),
                }));
                // If the request is not successful, an error is logged to the console
            } else {
                console.error("Error updating hive");
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },


    // Function for deleting a gift from the backend
    deleteGift: async (giftId) => {
        try {
            // Makes a DELETE request to the backend to remove a hive
            await fetch(withEndpoint(`gifts/${giftId}`), {
                method: "DELETE",
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

        } catch (error) {
            console.error("Error deleting gift:", error);
        }
    },

    // Function for deleting a hive
    deleteHive: async (hiveId) => {
        try {
            // Makes a DELETE request to the backend to remove a hive
            await fetch(withEndpoint(`hives/${hiveId}`), {
                method: "DELETE",
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

            // Removes the deleted hive from the store
            set((state) => ({
                hives: state.hives.filter((hive) => hive._id !== hiveId),
            }));

            // Here I call the getHives function to update the hives in the store
            await get().getHives();

        } catch (error) {
            console.error("Error deleting hive:", error);
        }
    },

    // Function to share a hive
    shareHive: async (hiveId, email) => {
        console.log(hiveId);
        try {
            // Makes a POST request to the backend to share a hive
            const response = await fetch(withEndpoint(`hives/${hiveId}/share`), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({ shareToEmail: email }),
            });

            const data = await response.json();

            // If the request is successful, the hive is updated in the store
            if (response.ok) {
                set((state) => ({
                    hives: state.hives.map((hive) =>
                        hive.id === hiveId ? { ...hive, ...data } : hive // I map over each hive in the store and update the state of the hive with the matching id
                    ),
                }));
                // If the request is not successful, an error is logged to the console
            } else {
                console.error("Error sharing hive");
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },

    // Function to get hives shared to the user by an other user
    getHivesSharedToMe: async (userId) => {
        try {
            // Makes a GET request to the backend to get all hives shared with the user
            const response = await fetch(withEndpoint(`hives/shared-with/${userId}`), {
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

            if (response.ok) {
                const data = await response.json();

                set({
                    hivesSharedToMe: data,
                });
            } else {
                console.error("Error fetching hives");
            }
        } catch (error) {
            console.error("There was an error =>", error);
        }
    },
}));