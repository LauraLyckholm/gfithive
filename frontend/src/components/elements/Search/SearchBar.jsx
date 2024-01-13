import "./search.css";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import searchIcon from "../../../assets/search-icon.svg";
import { useSearchStore } from "../../../stores/useSearchStore";
import { SearchResultsDropdown } from "./SearchResultsDropdown";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "var(--border-radius)",
    backgroundColor: "#ffffff",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    fontFamily: "var(--font)",
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

// Component for the search bar
export const SearchBar = () => {
    const { searchTerm, setSearchTerm, searchItems, searchData, searchPerformed } = useSearchStore();
    const [showDropdown, setShowDropdown] = useState(false);

    // Function that handles the search
    const handleSearch = () => {
        searchItems(searchTerm);
        setSearchTerm("");
        setShowDropdown(true)
    }

    // Function that hides the dropdown
    const hideDropdown = () => {
        setShowDropdown(false);
    };

    // Function that reacts to the "Enter" key being pressed, for accessibility
    const handleKeyDown = async (event) => {
        // Checks if "Enter" key is pressed
        if (event.code === "Enter") {
            handleSearch(searchTerm);
        }
    };

    return (
        <Search>
            <SearchIconWrapper>
                <img src={searchIcon} width="30px" alt="Search icon" />
            </SearchIconWrapper>
            <StyledInputBase
                name="search"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => handleKeyDown(event)}
            />
            {showDropdown && searchData && (
                <SearchResultsDropdown
                    results={searchData}
                    searchPerformed={searchPerformed}
                    hideDropDown={hideDropdown}
                />
            )}
        </Search>
    )
}