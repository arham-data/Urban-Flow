import { useState } from "react"
import "./Dashboard.css"
import Icon from "../Components/Icon.jsx"
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
                <div className="db-brand">
                    <span className="db-brand-mark"></span>
                    <span className="db-brand-name">UrbanFlow</span>
                    <span className="db-brand-tag">v0.2</span>
                </div>

                <div className="menu-1">
                    <span className="db-section-label">Workspace</span>
                    <div onClick={() => setPage("Dashboard")} className={"db-nav-item" + (page === "home" || page === "Dashboard" ? " active" : "")}>
                        <Icon name="grid"/>
                        <span>Dashboard</span>
                    </div>
                    <div onClick={() => setPage("FindResource")} className={"db-nav-item" + (page === "FindResource" ? " active" : "")}>
                        <Icon name="search"/>
                        <span>Find resources</span>
                    </div>
                    <div onClick={() => setPage("MyResources")} className={"db-nav-item" + (page === "MyResources" ? " active" : "")}>
                        <Icon name="folder"/>
                        <span>My resources</span>
                    </div>
                    <div onClick={() => setPage("Requests")} className={"db-nav-item" + (page === "Requests" ? " active" : "")}>
                        <Icon name="swap"/>
                        <span>Requests</span>
                    </div>
                    <div onClick={() => setPage("ActiveOperation")} className={"db-nav-item" + (page === "ActiveOperation" ? " active" : "")}>
                        <Icon name="pulse"/>
                        <span>Active Operations</span>
                    </div>
                    <div onClick={() => setPage("Messages")} className={"db-nav-item" + (page === "Messages" ? " active" : "")}>
                        <Icon name="chat"/>
                        <span>Messages</span>
                    </div>
                    <div onClick={() => setPage("Analytics")} className={"db-nav-item" + (page === "Analytics" ? " active" : "")}>
                        <Icon name="chart"/>
                        <span>Analytics</span>
                    </div>
                </div>
                <div className="menu-separator"></div>
                <div className="menu-2">
                    <span className="db-section-label">Account</span>
                    <div onClick={() => setPage("Profile")} className={"db-nav-item" + (page === "Profile" ? " active" : "")}>
                        <Icon name="person"/>
                        <span>Profile</span>
                    </div>
                    <div onClick={() => setPage("Settings")} className={"db-nav-item" + (page === "Settings" ? " active" : "")}>
                        <Icon name="settings"/>
                        <span>Settings</span>
                    </div>
                    <div onClick={() => setPage("HelpCenter")} className={"db-nav-item" + (page === "HelpCenter" ? " active" : "")}>
                        <Icon name="help"/>
                        <span>Help Center</span>
                    </div>
                </div>

                <div className="db-user">
                    <span className="db-user-avatar">AJ</span>
                    <div className="db-user-meta">
                        <strong>Arham Jain</strong>
                        <span>@arhamjain</span>
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