import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import "./header.css";
import { slide as Menu } from "react-burger-menu"; // Import the Menu component
// import { DesktopNavLinks } from "./Navigation/DesktopNavLinks";

// Component for the header
export const Header = () => {
    // State to control whether the menu is open or closed
    const [menuOpen, setMenuOpen] = useState(false);
    // State to control the width of the window
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Function to close the menu
    const closeMenu = () => {
        // Set isOpen to false to close the menu
        setMenuOpen(false);
    };

    // Add event listener to update windowWidth in state when the window is resized
    // useEffect(() => {
    //     const handleResize = () => {
    //         setWindowWidth(window.innerWidth);
    //     };
    //     window.addEventListener("resize", handleResize);
    //     // Remove event listener when component is unmounted
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    return (
        <header className="site-header">
            {/* {windowWidth < 1512 ? ( */}
            <section className="burger-menu">
                {/* Overlay for darkening background when the menu is open */}
                {menuOpen && <div className="overlay" onClick={closeMenu} />}
                {/* Render the image of the search icon first, then the logo and lastly the menu component and burger icon on smaller screens */}
                {/* <Logo /> */}
                <Menu
                    right
                    isOpen={menuOpen}
                    onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                    customBurgerIcon={<img src="./hamburger.svg" alt="Hamburger menu icon" />}
                    customCrossIcon={false}
                >
                    <MobileMenu onClick={closeMenu} />
                    <div className="close-menu" onClick={closeMenu}>
                        {/* <img src="./assets/icons/cross.svg" alt="Close menu icon" /> */}
                    </div>
                </Menu>
            </section>
            {/* ) : (
                <> */}
            {/* Render desktop links for larger screens and Logo first in the row of elements */}
            {/* <Logo />
                    <DesktopNavLinks />
                </>
            )} */}
        </header>
    )
}
