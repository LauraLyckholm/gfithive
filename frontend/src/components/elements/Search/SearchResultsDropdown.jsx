import "./search.css";
import { Link } from "react-router-dom";
// import { useSearchStore } from "../../../stores/useSearchStore";

export const SearchResultsDropdown = ({ results, searchPerformed, hideDropDown }) => {
    // const { setSearchTerm } = useSearchStore();
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
            {searchPerformed && noResults ? (
                <p>No results found</p>
            ) : (
                <>
                    {hives && hives.map(hive => (
                        <div key={hive._id} className="search-result-item">
                            <p onClick={onClickHideDropdown}>Hive: <Link to={`/hives/${hive._id}`} className="link" >{hive.name}</Link></p>
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
