import { Link } from "react-router-dom";
import "./link.css"

export const LinkToFAQ = () => {
    return (
        <>
            <p className="disclaimer">Curious on how it works? Buzz over to our <Link className="bold" to="/faq">FAQ!</Link></p>
        </>
    )
}
