import "./search.css";

export const SearchResultsDropdown = ({ results }) => {
    if (!results || results.length === 0) return null;
    console.log("results", results);

    // Destructures the results object
    const { hives, gifts, tags } = results;
    // const hivesResultsLength = hives.length;
    // const giftsResultsLength = gifts.length;
    // const tagsResultsLength = tags.length;

    console.log("hives", hives);
    console.log("gifts", gifts);
    console.log("tags", tags[0].tags);

    return (
        <div className="search-results-dropdown">
            {hives.map(hive => (
                <div key={hive._id} className="search-result-item">
                    <p>{hive.name}</p>
                </div>
            ))}
            {gifts.map(gift => (
                <div key={gift._id} className="search-result-item">
                    <p>{gift.gift}</p>
                </div>
            ))}
            {tags.map(tagItem => (
                tagItem.tags.map(tag => (
                    <div key={tag} className="search-result-tag">
                        <p>{tag}</p>
                    </div>
                ))
            ))}
        </div>
    );
}
