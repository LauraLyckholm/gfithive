import { useSearchStore } from "../../stores/useSearchStore";

export const SearchResults = () => {
    const { searchData } = useSearchStore();
    console.log(searchData);

    return (
        <div>
            {searchData.hives.map((item) => {
                return (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                )
            })}
        </div>
    )
}
