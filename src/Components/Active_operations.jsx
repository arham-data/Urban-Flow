import { useState, useEffect } from "react"
import Icon from "./Icon.jsx"

const API = "https://backend-production-4068.up.railway.app"

const typeIcons = {
    "Truck": "car",
    "Warehouse": "business",
    "Storage": "archive",
    "Inventory": "cube",
    "Empty Space": "aperture"
}

function pseudoProgress(createdAt){
    const created = new Date(createdAt).getTime()
    const hours = Math.max(0, (Date.now() - created) / 3600000)
    return Math.min(70, Math.round(15 + hours * 12))
}

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

function ActiveOperation(){
    const [operations, setOperations] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(0)
    const [busyId, setBusyId] = useState(null)

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const userId = user.id

    useEffect(() => {
        if (!userId) return
        fetch(`${API}/api/requests/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                const all = [...(data.incoming || []), ...(data.outgoing || [])]
                const accepted = all.filter(r => r.status === "accepted")
                setOperations(accepted)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [userId, reload])

    async function handleComplete(requestId){
        setBusyId(requestId)
        const res = await fetch(`${API}/api/requests/${requestId}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({status: "completed"})
        })
        if (res.ok){
            setReload(n => n + 1)
        }
        setBusyId(null)
    }

    function counterparty(op){
        return String(op.sender_id) === String(userId) ? op.receiver_name : op.sender_name
    }

    return(
        <div className="ao-page">

            <div className="ao-title">
                <h1>Active Operations</h1>
                <p>Track your live resource movements in real time.</p>
            </div>

            <div className="ao-layout">
                <div className="ao-map">
                    <Icon name="map"/>
                    <span className="ao-map-label">Live route map</span>
                </div>

                <div className="ao-list">
                    {loading ? (
                        <p style={{textAlign:"center",color:"var(--muted)",padding:"80px 0"}}>Loading operations...</p>
                    ) : operations.length === 0 ? (
                        <div className="ao-empty">
                            <Icon name="pulse" size={30}/>
                            <p className="ao-empty-title">No active operations</p>
                            <p className="ao-empty-sub">When a request is accepted, the operation shows up here.</p>
                        </div>
                    ) : operations.map((op) => {
                        const progress = pseudoProgress(op.created_at)
                        return (
                            <div className="ao-card" key={op.request_id}>
                                <div className="ao-card-head">
                                    <div className="ao-type">
                                        <Icon name={typeIcons[op.resource_type] || "circle"}/>
                                        <span>{op.resource_title}</span>
                                    </div>
                                    <span className="ao-status in-progress">● In Progress</span>
                                </div>
                                <div className="ao-route">
                                    <span>{op.resource_location || "Pending pickup"}</span>
                                    <Icon name="arrow"/>
                                    <span>Destination</span>
                                </div>
                                <div className="ao-progress">
                                    <div className="ao-progress-track">
                                        <div className="ao-progress-fill" style={{width: `${progress}%`}}></div>
                                    </div>
                                    <span className="ao-progress-num">{progress}%</span>
                                </div>
                                <div className="ao-meta">
                                    <span>Started {timeAgo(op.created_at)}</span>
                                    <span>{counterparty(op)}</span>
                                </div>
                                <div className="ao-actions">
                                    <button className="ao-btn ao-btn-input" disabled={busyId === op.request_id} onClick={() => handleComplete(op.request_id)}>Mark Complete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default ActiveOperation