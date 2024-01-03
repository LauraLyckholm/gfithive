import hiveIcon from "../../assets/hiveIcon.svg";
import "./error-page.css";

export const ErrorPage = () => {
    return (
        <section className="main-wrapper">
            <img id="error-page-icon" src={hiveIcon} alt="Hive icon" />
            <h1>Oops! Something went wrong...</h1>
            <p>Looks like you&apos;ve stumbled upon a page that doesn&apos;t exist.</p>
            <p>Try going back to the previous page or <a className="bold" href="/">return to the homepage</a>.</p>
        </section>
    )
}
