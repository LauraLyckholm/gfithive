// import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mobileMenu.css";

// Component for the navigation links in the header on mobile, the menus have different links in them
export const MobileMenu = ({ onClick }) => {
    // // State to control whether the menu is open or closed
    // const [isOpen, setIsOpen] = useState(true);

    // // Function to toggle the menu
    // const toggleClose = () => {
    //     setIsOpen(false);
    // };

    // // If the mobile menu is closed (i.e. isOpen is false), return nothing
    // if (!isOpen) {
    //     return null;
    // }

    return (
        <nav>
            <ul>
                <div>
                    <li onClick={onClick}><NavLink to="/"></NavLink>Home</li>
                </div>
            </ul>
        </nav>
    )
}