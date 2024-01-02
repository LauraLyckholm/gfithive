import { useState } from "react";
// import { MobileMenu } from "./MobileMenu";
import { elastic as Menu } from "react-burger-menu"; // Import the Menu component
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../elements/Button/Button";
import { useUserStore } from "../../stores/useUserStore";
import { useGiftStore } from "../../stores/useGiftStore";
// import { DesktopNavLinks } from "./Navigation/DesktopNavLinks";
import "./header.css";
import hamburgerIcon from "../../assets/hamburger.svg";
import crossIcon from "../../assets/cross.svg";
import beeImage from "../../assets/bee.svg";
import honeyImage from "../../assets/honey.svg";

// Component for the header
export const Header = () => {
    const { logoutUser, isLoggedIn } = useUserStore();
    const { hives } = useGiftStore();
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
                {isLoggedIn ?
                    <Link to="/dashboard">
                        <img src={beeImage} alt="Gifthive Logo" />
                    </Link> :
                    <Link to="/login">
                        <img src={beeImage} alt="Gifthive Logo" />
                    </Link>
                }

            </div>
            <Menu
                right
                isOpen={menuOpen}
                onStateChange={(state) => setMenuOpen(state.isOpen)}
                closeMenuOnBlur={true}
                customBurgerIcon={<img src={hamburgerIcon} alt="Hamburger menu icon" />}
                customCrossIcon={<img className="custom-icon" src={crossIcon} alt="Close menu icon" />}
                className={"mobile-nav"}
            >
                <main id="page-wrap">
                    <img className="honey-image" src={honeyImage} alt="Image of honey dripping down the menu" />
                    <ul className="mobile-links main-list">
                        {isLoggedIn ? (
                            <>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/hives">All hives</Link>
                                    <ul className="minor-list">
                                        {hives.map((hive) => {
                                            return (
                                                <li key={hive._id}>
                                                    <Link to={`/hives/${hive._id}`}>{hive.name}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Button className="primary" btnText="Log out" handleOnClick={handleLogout} /></li>
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
