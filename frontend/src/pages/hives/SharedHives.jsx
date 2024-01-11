import { useEffect } from "react";
import { useGiftStore } from "../../stores/useGiftStore";
import { useUserStore } from "../../stores/useUserStore";

export const SharedHives = () => {
    const { getHivesSharedToMe, hivesSharedToMe } = useGiftStore();
    const { getHivesSharedByUser, hivesSharedByMe } = useUserStore();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        (async () => {
            const sharedToMe = await getHivesSharedToMe();
            const sharedByMe = await getHivesSharedByUser(userId);
            localStorage.setItem("hivesSharedToMe", JSON.stringify(sharedToMe));
            localStorage.setItem("hivesSharedByMe", JSON.stringify(sharedByMe));
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
