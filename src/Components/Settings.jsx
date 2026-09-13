import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "./Icon.jsx"

const defaultSettings = {
    requestUpdates: true,
    operationAlerts: true,
    emailNotifications: false,
    marketing: false,
    twoFactor: true
}

function Settings(){

    const navigate = useNavigate()

    const [settings, setSettings] = useState(() => ({
        ...defaultSettings,
        ...JSON.parse(localStorage.getItem("settings") || "{}")
    }))

    function toggleSetting(key){
        setSettings(prev => {
            const next = {...prev, [key]: !prev[key]}
            localStorage.setItem("settings", JSON.stringify(next))
            return next
        })
    }

    function handleLogout(){
        localStorage.removeItem("user")
        navigate("/login")
    }

    return(
        <div className="set-page">

            <div className="set-title">
                <h1>Settings</h1>
                <p>Manage your account, notifications, security and preferences.</p>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <Icon name="person"/>
                    <h2>Profile</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <Icon name="create"/>
                        <span>Edit personal information</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="set-pref">
                        <Icon name="business"/>
                        <span>Business details &amp; verification</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="set-pref">
                        <Icon name="image"/>
                        <span>Profile photo</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <Icon name="bell"/>
                    <h2>Notifications</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref" onClick={() => toggleSetting("requestUpdates")} style={{cursor:"pointer"}}>
                        <Icon name="swap"/>
                        <span>Request updates</span>
                        <span className={"set-toggle" + (settings.requestUpdates ? " on" : "")}></span>
                    </div>
                    <div className="set-pref" onClick={() => toggleSetting("operationAlerts")} style={{cursor:"pointer"}}>
                        <Icon name="pulse"/>
                        <span>Operation alerts</span>
                        <span className={"set-toggle" + (settings.operationAlerts ? " on" : "")}></span>
                    </div>
                    <div className="set-pref" onClick={() => toggleSetting("emailNotifications")} style={{cursor:"pointer"}}>
                        <Icon name="mail"/>
                        <span>Email notifications</span>
                        <span className={"set-toggle" + (settings.emailNotifications ? " on" : "")}></span>
                    </div>
                    <div className="set-pref" onClick={() => toggleSetting("marketing")} style={{cursor:"pointer"}}>
                        <Icon name="megaphone"/>
                        <span>Marketing &amp; promotions</span>
                        <span className={"set-toggle" + (settings.marketing ? " on" : "")}></span>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <Icon name="shield"/>
                    <h2>Privacy &amp; Security</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <Icon name="lock"/>
                        <span>Change password</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="set-pref" onClick={() => toggleSetting("twoFactor")} style={{cursor:"pointer"}}>
                        <Icon name="fingerprint"/>
                        <span>Two-factor authentication</span>
                        <span className={"set-toggle" + (settings.twoFactor ? " on" : "")}></span>
                    </div>
                    <div className="set-pref">
                        <Icon name="eye-off"/>
                        <span>Privacy settings</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="set-pref">
                        <Icon name="shield"/>
                        <span>Verified devices</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <Icon name="wallet"/>
                    <h2>Payments</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <Icon name="card"/>
                        <span>Payment methods</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="set-pref">
                        <Icon name="cash"/>
                        <span>Payout preferences</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="set-pref">
                        <Icon name="receipt"/>
                        <span>Billing &amp; invoices</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <Icon name="location"/>
                    <h2>Saved</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <Icon name="location"/>
                        <span>Saved locations</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="set-pref">
                        <Icon name="bookmark"/>
                        <span>Saved resources</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <Icon name="options"/>
                    <h2>General</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <Icon name="language"/>
                        <span>Language</span>
                        <span className="set-value">English</span>
                    </div>
                    <div className="set-pref">
                        <Icon name="palette"/>
                        <span>Appearance</span>
                        <span className="set-value">Light</span>
                    </div>
                    <div className="set-pref set-pref-danger" onClick={handleLogout} style={{cursor:"pointer"}}>
                        <Icon name="logout"/>
                        <span>Logout</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings