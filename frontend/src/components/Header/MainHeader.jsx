import { useState } from "react";
// import { MobileMenu } from "./MobileMenu";
import { elastic as Menu } from "react-burger-menu"; // Import the Menu component
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../elements/Button/Button";
import { useUserStore } from "../../stores/useUserStore";
// import { DesktopNavLinks } from "./Navigation/DesktopNavLinks";
import "./mainHeader.css";

// Component for the header
export const Header = () => {
    const { logoutUser } = useUserStore();
    // State to control whether the menu is open or closed
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            setMenuOpen(false); // Closes the menu after logout
            navigate("/"); // Navigates to the home page after logout
            console.clear(); // Clears the console after the logout
        } catch (error) {
            console.error("There was an error during logout =>", error);
        }
    }

    return (
        <header className="site-header" id="outer-container">
            <Menu
                isOpen={menuOpen}
                onStateChange={(state) => setMenuOpen(state.isOpen)}
                right
                // noOverlay
                customBurgerIcon={<img className="custom-icon" src="./hamburger.svg" alt="Hamburger menu icon" />}
                customCrossIcon={<img className="custom-icon" src="./cross.svg" alt="Close menu icon" />}
                closeMenuOnBlur={true} // Close menu when clicking outside of it
                className={"mobile-nav"}
            >

                <main id="page-wrap">
                    <ul className="mobile-links">
                        <li><Link to="/"></Link>Hives</li>
                        <Link onClick={handleLogout}><Button className="primary" btnText="Log out" /></Link>
                    </ul>
                </main>
            </Menu>
        </header>


    )
}
