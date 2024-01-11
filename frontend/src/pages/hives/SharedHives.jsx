import { useEffect } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";

export const SharedHives = () => {
    const { getSharedHives, hivesSharedToMe } = useGiftStore();
    const { getHivesSharedByUser, hivesSharedByMe } = useUserStore();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        (async () => {
            await getSharedHives();
            await getHivesSharedByUser(userId);
            // const hives = JSON.parse(localStorage.getItem("sharedHives") || "[]");
            // setSharedHives(hives);
        })();
    }, []);

    // Render the shared hives with their gifts
    return (
        <div>
            <h1>Shared hives</h1>
            <h2>Shared to me</h2>
            {hivesSharedToMe.map(hive => (
                <div key={hive._id}>
                    <h3>{hive.name}</h3>
                </div>
            ))}
            <hr></hr>
            <h2>Shared by me</h2>
            {hivesSharedByMe.map(hive => (
                <div key={hive._id}>
                    <h3>{hive.name}</h3>
                </div>
            ))}
        </div>
    );
}
