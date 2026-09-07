import { useState } from "react"
import "./Dashboard.css"
import DashboardHome from "../Components/Dashboard_home.jsx"
import "../Components/Dashboard_home.css"
import FindResource from "../Components/Find_resources.jsx"
import "../Components/Find_resources.css"
import Profile from "../Components/Profile.jsx"
import "../Components/Profile.css"
import MyResources from "../Components/My_resources.jsx"
import "../Components/My_resources.css"
import ActiveOperation from "../Components/Active_operations.jsx"
import "../Components/Active_operations.css"
import Messages from "../Components/Messages.jsx"
import "../Components/Messages.css"
import Analytics from "../Components/Analytics.jsx"
import "../Components/Analytics.css"
import Settings from "../Components/Settings.jsx"
import "../Components/Settings.css"
import HelpCenter from "../Components/Help_center.jsx"
import "../Components/Help_center.css"
import Requests from "../Components/Requests.jsx"
import "../Components/Requests.css"

function Dashboard(){

    const [page,setPage] = useState("home")


    return(
        <>  
        <div className="Dashboard">
            <div className="db-menu">
                <div className="menu-1">
                    <div className="m1-1">
                        <ion-icon name="cube-outline"></ion-icon>
                        <span>UrbanFlow</span>
                    </div>
                    <div onClick={() => setPage("Dashboard")} className="m1-2">
                        <ion-icon name="grid-outline"></ion-icon>
                        <span>Dashboard</span>
                    </div>
                    <div onClick={() => setPage("FindResource")} className="m1-3">
                        <ion-icon name="search-outline"></ion-icon>
                        <span>Find resources</span>
                    </div>
                    <div onClick={() => setPage("MyResources")} className="m1-4">
                        <ion-icon name="folder-open-outline"></ion-icon>
                        <span>My resources</span>
                    </div>
                    <div onClick={() => setPage("Requests")} className="m1-5">
                        <ion-icon name="swap-horizontal-outline"></ion-icon>
                        <span>Requests</span>
                    </div>
                    <div onClick={() => setPage("ActiveOperation")} className="m1-6">
                        <ion-icon name="pulse-outline"></ion-icon>
                        <span>Active Operation</span>
                    </div>
                    <div onClick={() => setPage("Messages")} className="m1-7">
                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                        <span>Messages</span>
                    </div>
                    <div onClick={() => setPage("Analytics")} className="m1-8">
                        <ion-icon name="bar-chart-outline"></ion-icon>
                        <span>Analytics</span>
                    </div>
                </div>
                <div className="menu-separator"></div>
                <div className="menu-2">
                    <div onClick={() => setPage("Profile")} className="m2-1">
                        <ion-icon name="person-outline"></ion-icon>
                        <span>Profile</span>
                    </div>
                    <div onClick={() => setPage("Settings")} className="m2-2">
                        <ion-icon name="settings-outline"></ion-icon>
                        <span>Settings</span>
                    </div>
                    <div onClick={() => setPage("HelpCenter")} className="m2-3">
                        <ion-icon name="help-circle-outline"></ion-icon>
                        <span>Help Center</span>
                    </div>
                </div>
            </div>


            <div className="db-content">
                <div className="content-main">
                    {(page === "home" || page === "Dashboard") && <DashboardHome/>}
                    {page === "FindResource" && <FindResource/>}
                    {page === "MyResources" && <MyResources/>}
                    {page === "Requests" && <Requests/>}
                    {page === "ActiveOperation" && <ActiveOperation/>}
                    {page === "Messages" && <Messages/>}
                    {page === "Analytics" && <Analytics/>}
                    {page === "Profile" && <Profile/>}
                    {page === "Settings" && <Settings/>}
                    {page === "HelpCenter" && <HelpCenter/>}
                </div>           
            </div>
        </div>
        </>
    )
}

export default Dashboard