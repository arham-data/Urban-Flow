import { useState, useEffect } from "react"
import Icon from "./Icon.jsx"

const API = "https://backend-production-4068.up.railway.app"

function timeAgo(dateStr){
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins} min ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`
    const days = Math.floor(hrs / 24)
    return `${days} day${days > 1 ? "s" : ""} ago`
}

function DashboardHome({ onFindResources }){

    const [resources, setResources] = useState([])

    useEffect(() => {
        fetch(`${API}/api/resources`)
            .then(res => res.json())
            .then(data => setResources(data.resources || []))
            .catch(() => {})
    }, [])

    const available = resources.filter(r => r.status === "available").length
    const partial = resources.filter(r => r.status === "partial").length
    const reserved = resources.filter(r => r.status === "reserved").length
    const unavailable = resources.filter(r => r.status === "unavailable").length
    const recent = resources.slice(0, 4)

    return(
        <div className="dhome-page">

            <div className="dhome-hero">
                <div className="dhome-hero-text"> 
                    <p>Your live city resource network is ready. Here's what's happening right now.</p>
                </div>
                <button className="dhome-hero-btn" onClick={onFindResources}>Find Resources</button>
            </div>

            <div className="dhome-grid">
                <div className="dhome-tile">
                    <Icon name="pulse"/>
                    <span className="dhome-tile-value">0</span>
                    <span className="dhome-tile-label">Active operations</span>
                </div>
                <div className="dhome-tile">
                    <Icon name="cube"/>
                    <span className="dhome-tile-value">{available}</span>
                    <span className="dhome-tile-label">Resources available</span>
                </div>
                <div className="dhome-tile">
                    <Icon name="swap"/>
                    <span className="dhome-tile-value">0</span>
                    <span className="dhome-tile-label">Pending requests</span>
                </div>
            </div>

            <div className="dhome-sections">
                <div className="dhome-section">
                    <div className="dhome-section-head">
                        <Icon name="time"/>
                        <h2>Recent Activity</h2>
                    </div>
                    <div className="dhome-activity">
                        {recent.length === 0 ? (
                            <div className="dhome-activity-empty">No activity yet — add your first resource to get started.</div>
                        ) : recent.map((r, i) => (
                            <div className="dhome-activity-item" key={r.resource_id}>
                                <span className={`dhome-activity-dot ${i % 2 === 0 ? "activity-green" : "activity-blue"}`}></span>
                                <span className="dhome-activity-text">{r.owner_name} listed a {r.type}{r.location ? ` in ${r.location}` : ""}</span>
                                <span className="dhome-activity-time">{timeAgo(r.created_at)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dhome-section">
                    <div className="dhome-section-head">
                        <Icon name="radio"/>
                        <h2>Live Network</h2>
                    </div>
                    <div className="dhome-live">
                        <div className="dhome-live-row">
                            <span className="dhome-live-status status-available">● Available</span>
                            <span className="dhome-live-text">{available} resources</span>
                        </div>
                        <div className="dhome-live-row">
                            <span className="dhome-live-status status-partial">● Partial</span>
                            <span className="dhome-live-text">{partial} resources</span>
                        </div>
                        <div className="dhome-live-row">
                            <span className="dhome-live-status status-reserved">● Reserved</span>
                            <span className="dhome-live-text">{reserved} resources</span>
                        </div>
                        <div className="dhome-live-row">
                            <span className="dhome-live-status status-unavailable">● Unavailable</span>
                            <span className="dhome-live-text">{unavailable} resources</span>
                        </div>
                        <button className="dhome-live-btn" onClick={onFindResources}>Browse marketplace</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardHome