import Hive from "../../../assets/beehive.svg";
import Line from "../../../assets/line.svg";
import "./hiveImage.css";

export const HiveImage = () => {
    return (
        <>
            <img className="line" src={Line} alt="Line" />
            <img className="beehive" src={Hive} alt="Beehive" />
        </>
    )
}
