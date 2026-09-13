import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "./Icon.jsx"

const API = "https://backend-production-4068.up.railway.app"

function maskPhone(phone){
    if (!phone) return "—"
    return `+91 ${phone.slice(0, 2)}••••••${phone.slice(8)}`
}

function maskEmail(email){
    if (!email) return "—"
    const [name, domain] = email.split("@")
    return `${name.charAt(0)}••••@${domain}`
}

function Profile(){

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const name = user.name || "User"
    const username = user.username || "username"
    const phone = user.phone || ""
    const email = user.email || ""

    const [myCount, setMyCount] = useState(0)

    const initials = name.replace(/[^a-zA-Z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("") || "U"

    useEffect(() => {
        if (user.id){
            fetch(`${API}/api/resources/mine/${user.id}`)
                .then(res => res.json())
                .then(data => setMyCount((data.resources || []).length))
                .catch(() => {})
        }
    }, [user.id])

    function handleLogout(){
        localStorage.removeItem("user")
        navigate("/login")
    }

    return(
        <div className="profile-page">

            <div className="profile-hero">
                <div className="profile-avatar" style={{fontSize:"26px",fontWeight:700}}>{initials}</div>
                <div className="profile-id">
                    <div className="profile-name-row">
                        <h1>{name}</h1>
                        <span className="profile-verified">
                            <Icon name="check"/>
                            Verified
                        </span>
                    </div>
                    <span className="profile-username">@{username}</span>
                    <span className="profile-type">Member</span>
                    <div className="profile-meta">
                        <span>
                            <Icon name="location"/>
                            Location not set
                        </span>
                        <span>
                            <Icon name="calendar"/>
                            Member of UrbanFlow
                        </span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="card"/>
                    <h2>Personal Information</h2>
                </div>
                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="profile-stat-label">Full name</span>
                        <span className="profile-stat-value">{name}</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Username</span>
                        <span className="profile-stat-value">@{username}</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Phone</span>
                        <span className="profile-stat-value">{maskPhone(phone)}</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Email</span>
                        <span className="profile-stat-value">{maskEmail(email)}</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Location</span>
                        <span className="profile-stat-value">Not set</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Preferred language</span>
                        <span className="profile-stat-value">English</span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="shield"/>
                    <h2>Verification</h2>
                </div>
                <div className="profile-trust">
                    <div className="profile-trust-score">
                        <div className="profile-score-ring">
                            <span>—</span>
                        </div>
                        <div className="profile-score-meta">
                            <strong>Trust Score</strong>
                            <span>Build it up by completing your profile and completing transactions.</span>
                        </div>
                    </div>
                    <div className="profile-verify-list">
                        <div className="profile-verify-item">
                            <span>Phone</span>
                            <Icon name="check" className="verified"/>
                        </div>
                        <div className="profile-verify-item">
                            <span>Email</span>
                            <Icon name="check" className="verified"/>
                        </div>
                        <div className="profile-verify-item">
                            <span>Identity</span>
                            <Icon name="circle"/>
                        </div>
                        <div className="profile-verify-item">
                            <span>Business</span>
                            <Icon name="circle"/>
                        </div>
                        <div className="profile-verify-item">
                            <span>Address</span>
                            <Icon name="circle"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="pulse"/>
                    <h2>My Activity</h2>
                </div>
                <div className="profile-stat-grid">
                    <div className="profile-tile">
                        <span className="profile-tile-value">{myCount}</span>
                        <span className="profile-tile-label">Resources listed</span>
                    </div>
                    <div className="profile-tile">
                        <span className="profile-tile-value">0</span>
                        <span className="profile-tile-label">Resources rented / used</span>
                    </div>
                    <div className="profile-tile">
                        <span className="profile-tile-value">0</span>
                        <span className="profile-tile-label">Completed requests</span>
                    </div>
                    <div className="profile-tile">
                        <span className="profile-tile-value">0</span>
                        <span className="profile-tile-label">Active operations</span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="settings"/>
                    <h2>Account &amp; Preferences</h2>
                </div>
                <div className="profile-prefs">
                    <div className="profile-pref">
                        <Icon name="bell"/>
                        <span>Notifications</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="lock"/>
                        <span>Privacy</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="shield"/>
                        <span>Security</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="wallet"/>
                        <span>Payment methods</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="location"/>
                        <span>Saved locations</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="bookmark"/>
                        <span>Saved resources</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="language"/>
                        <span>Language</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="palette"/>
                        <span>Appearance</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref profile-pref-danger" onClick={handleLogout} style={{cursor:"pointer"}}>
                        <Icon name="logout"/>
                        <span>Logout</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile