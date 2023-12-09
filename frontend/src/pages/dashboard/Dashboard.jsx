import { LogOut } from "../../components/controllers/LogOut"
import "./dashboard.css"

export const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>This is your dashboard</h1>
            <LogOut />
        </div>

    )
}
