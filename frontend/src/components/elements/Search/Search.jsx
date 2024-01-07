// import "./search.css";
// import { useState } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
import searchIcon from "../../../assets/search-icon.svg";
import { useSearchStore } from "../../../stores/useSearchStore";

export const Search = () => {
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

    const { searchTerm, setSearchTerm, searchItems, searchData } = useSearchStore();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = () => {
        // event.preventDefault();
        searchItems(searchTerm);
        console.log(searchData);
    }

    // Function that reacts to the "Enter" key being pressed, for accessibility
    const handleKeyPress = async (event, action, searchTerm) => {
        // Checks if "Enter" key is pressed
        if (event.key === "Enter") {
            // If the action is update, the handleUpdateGift function will be called
            if (action === "search") {
                handleSearch(searchTerm);
            }
        }
    };

    return (
        <Search>
            <SearchIconWrapper>
                <img src={searchIcon} width="30px" alt="Search icon" />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(event) => handleKeyPress(event, "search")}
            />
        </Search>
    )
}