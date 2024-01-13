import "./search.css";
import { Link } from "react-router-dom";
import { useUserStore } from "../../../stores/useUserStore";

export const SearchResultsDropdown = ({ results, searchPerformed, hideDropDown }) => {
    const { isLoggedIn } = useUserStore();
    // Destructures the results object
    const { hives, gifts } = results;
    if (!results) return null;

    // Check if both hives and gifts are empty
    const noResults = (!hives || hives.length === 0) && (!gifts || gifts.length === 0);

    const onClickHideDropdown = () => {
        hideDropDown();
    };

    return (
        <div className="search-results-dropdown">
            {/* Notifies the user that they must log in to search */}
            {!isLoggedIn ? <p>You must log in to search!</p> : null}
            {searchPerformed && noResults ? (
                <p>No results found</p>
            ) : (
                <>
                    {hives && hives.map(hive => (
                        <div key={hive._id} className="search-result-item">
                            <p onClick={onClickHideDropdown}>
                                {hive.sharedWith.length !== 0 ? "Shared hive: " : "Hive: "}
                                <Link
                                    to={hive.sharedWith.length !== 0 ? `/shared-hives` : `/hives/${hive._id}`}
                                    className="link"
                                >
                                    {hive.name}
                                </Link>
                            </p>
                        </div>
                    ))}
                    {gifts && gifts.map(gift => (
                        <div key={gift._id} className="search-result-item">
                            <p onClick={onClickHideDropdown}>Gift: <Link to={`/hives/${gift.hiveId}`}>{gift.gift}</Link></p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
