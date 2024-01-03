import { Link } from "react-router-dom";
import "./link.css"

// Component for the link to the FAQ. This is in it's own component to avoid repetition in the rest of the code
export const LinkToFAQ = () => {
    return (
        <>
            <p className="disclaimer">Curious on how it works? Buzz over to our <Link className="bold" to="/faq">FAQ!</Link></p>
        </>
    )
}
