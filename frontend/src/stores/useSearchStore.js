import { create } from "zustand";

// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/search-routes/search?${endpoint}`;

// Creates a store for the user handling
export const useSearchStore = create((set) => ({
    searchTerm: "",
    searchData: [],

    setSearchTerm: (searchTerm) => {
        set({ searchTerm });
    },

    searchItems: async (searchValue) => {
        try {
            const response = await fetch(withEndpoint(`searchTerm=${searchValue}`), {
                headers: {
                    "Auth": localStorage.getItem("accessToken"),
                },
            });
            if (response.ok) {
                const data = await response.json();
                set({
                    searchData: data,
                });
            }
        } catch (error) {
            console.error("There was an error =>", error);
        }
    },
}));