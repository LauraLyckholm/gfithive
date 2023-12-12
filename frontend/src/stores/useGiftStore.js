import { create } from "zustand";
// import { useUserStore } from "./useUserStore";

// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/gift-routes/${endpoint}`;

// Creates a store for the gift hive handling
export const useGiftStore = create((set) => ({
    gifts: [],
    hives: [],
    hiveName: "",
    // userId: useUserStore.getState().userId,

    setGifts: (gifts) => set({ gifts }),
    setHives: (hives) => set({ hives }),
    setHiveName: (hiveName) => set({ hiveName }),

    getGifts: async () => {
        try {
            const response = await fetch(withEndpoint("gifts"), {
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

            if (response.ok) {
                const data = await response.json();

                set({
                    gifts: data
                });
            } else {
                console.error("Error fetching gifts");
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },

    getHives: async () => {
        try {
            const response = await fetch(withEndpoint("hives"), {
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });

            if (response.ok) {
                const data = await response.json();

                set({
                    hives: data
                });
            } else {
                console.error("Error fetching hives");
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },


    addGift: async (newGift) => {
        try {
            // Make a POST request to create a new gift
            const response = await fetch(withEndpoint("gifts"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify(newGift),
            });

            const data = await response.json();

            if (response.ok) {
                set((state) => ({
                    gifts: [...state.gifts, data]
                }));
            } else {
                console.error("Error adding gift");
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },

    addHive: async (newHive) => {
        try {
            // Make a POST request to create a new hive
            const response = await fetch(withEndpoint("hives"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Auth": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify(newHive),
            });

            const data = await response.json();

            if (response.ok) {
                set((state) => ({
                    hives: [...state.hives, data]
                }));
            } else {
                console.error("Error adding hive");
            }

        } catch (error) {
            console.error("There was an error =>", error);
        }
    },

    // updateGift: async (updatedGift) => {
    //     try {
    //         // Make a PUT request to update an existing gift
    //         const response = await fetch(withEndpoint(`gifts/${updatedGift.id}`), {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(updatedGift),
    //         });
    //         const data = await response.json();
    //         set((state) => ({
    //             gifts: state.gifts.map((gift) =>
    //                 gift.id === updatedGift.id ? { ...gift, ...data } : gift
    //             ),
    //         }));
    //     } catch (error) {
    //         console.error("Error updating gift:", error);
    //     }
    // },

    // deleteGift: async (giftId) => {
    //     try {
    //         // Make a DELETE request to remove a gift
    //         await fetch(withEndpoint(`gifts/${giftId}`), {
    //             method: "DELETE",
    //         });
    //         set((state) => ({
    //             gifts: state.gifts.filter((gift) => gift.id !== giftId),
    //         }));
    //     } catch (error) {
    //         console.error("Error deleting gift:", error);
    //     }
    // },

    // setLoading: (isLoading) => {
    //     set({ loading: isLoading });
    // },
}));
