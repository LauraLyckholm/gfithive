import { create } from "zustand";

// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/gift-routes/${endpoint}`;

// Creates a store for the gift hive handling
export const useGiftStore = create((set) => ({
    gifts: [],
    hives: [],
    // loading: false,

    fetchGifts: async () => {
        try {
            set({ loading: true });
            const response = await fetch("gifts"); // Update the endpoint to match your backend
            const data = await response.json();
            set({ gifts: data, loading: false });
        } catch (error) {
            console.error("Error fetching gifts:", error);
            set({ loading: false });
        }
    },

    addGift: async (newGift) => {
        try {
            // Make a POST request to create a new gift
            const response = await fetch(withEndpoint("gifts"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGift),
            });
            const data = await response.json();
            set((state) => ({ gifts: [...state.gifts, data] }));
        } catch (error) {
            console.error("Error adding gift:", error);
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
