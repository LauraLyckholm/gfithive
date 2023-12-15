import { useState } from "react";
// import { MobileMenu } from "./MobileMenu";
import { elastic as Menu } from "react-burger-menu"; // Import the Menu component
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../elements/Button/Button";
import { useUserStore } from "../../stores/useUserStore";
// import { DesktopNavLinks } from "./Navigation/DesktopNavLinks";
import "./mainHeader.css";
import hamburgerIcon from "../../assets/hamburger.svg";
import crossIcon from "../../assets/cross.svg";
import beeImage from "../../assets/bee.svg";

// Component for the header
export const Header = () => {
    const { logoutUser, isLoggedIn } = useUserStore();
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
            <div className="logo">
                <Link to="/">
                    <img src={beeImage} alt="Gifthive Logo" />
                </Link>
            </div>
            <Menu
                isOpen={menuOpen}
                onStateChange={(state) => setMenuOpen(state.isOpen)}
                right
                customBurgerIcon={<img className="custom-icon" src={hamburgerIcon} alt="Hamburger menu icon" />}
                customCrossIcon={<img className="custom-icon" src={crossIcon} alt="Close menu icon" />}
                closeMenuOnBlur={true}
                className={"mobile-nav"}
            >
                <main id="page-wrap">
                    <ul className="mobile-links">
                        {isLoggedIn ? (
                            <>
                                <li><Link to="/hives">Hives</Link></li>
                                <li><Link to="/create-hive">Create a new hive</Link></li>
                                <li><Button className="primary" btnText="Log out" onClick={handleLogout} /></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </main>
            </Menu>
        </header>
    )
}