import { useState, useEffect } from "react"
import Icon from "./Icon.jsx"

const API = "https://backend-production-4068.up.railway.app"

const statusClasses = {
    "pending": "status-reserved",
    "accepted": "status-available",
    "declined": "status-unavailable",
    "completed": "status-partial"
}

const statusLabels = {
    "pending": "Pending",
    "accepted": "Accepted",
    "declined": "Declined",
    "completed": "Completed"
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

function EmptyState({icon, title, sub}){
    return(
        <div className="req-empty">
            <Icon name={icon} size={30}/>
            <p className="req-empty-title">{title}</p>
            <p className="req-empty-sub">{sub}</p>
        </div>
    )
}

function Requests(){
    const [incoming, setIncoming] = useState([])
    const [outgoing, setOutgoing] = useState([])
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
                setIncoming(data.incoming || [])
                setOutgoing(data.outgoing || [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [userId, reload])

    async function handleAction(requestId, status){
        setBusyId(requestId)
        const res = await fetch(`${API}/api/requests/${requestId}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({status})
        })
        if (res.ok){
            setReload(n => n + 1)
        }
        setBusyId(null)
    }

    const pendingCount = [...incoming, ...outgoing].filter(r => r.status === "pending").length
    const completedCount = [...incoming, ...outgoing].filter(r => r.status === "completed").length

    return(
        <div className="req-page">

            <div className="req-title">
                <h1>Requests</h1>
                <p>Incoming and outgoing resource requests across your network.</p>
            </div>

            <div className="req-kpis">
                <div className="req-kpi">
                    <span className="req-kpi-value">{incoming.length}</span>
                    <span className="req-kpi-label">Incoming</span>
                </div>
                <div className="req-kpi">
                    <span className="req-kpi-value">{outgoing.length}</span>
                    <span className="req-kpi-label">Outgoing</span>
                </div>
                <div className="req-kpi">
                    <span className="req-kpi-value">{pendingCount}</span>
                    <span className="req-kpi-label">Pending</span>
                </div>
                <div className="req-kpi">
                    <span className="req-kpi-value">{completedCount}</span>
                    <span className="req-kpi-label">Completed</span>
                </div>
            </div>

            {loading ? (
                <p style={{textAlign:"center",color:"var(--muted)",padding:"80px 0"}}>Loading requests...</p>
            ) : (
                <div className="req-columns">
                    <div className="req-column">
                        <div className="req-column-head">
                            <Icon name="arrow-down"/>
                            <h2>Incoming Requests</h2>
                        </div>

                        {incoming.length === 0 ? (
                            <EmptyState icon="arrow-down" title="No incoming requests" sub="When someone requests your resource it shows up here."/>
                        ) : incoming.map((r) => (
                            <div className="req-card incoming" key={r.request_id}>
                                <div className="req-card-info">
                                    <h3>{r.resource_title}</h3>
                                    <p>{r.sender_name} · {r.resource_location || "No location"}</p>
                                    <span className="req-meta">{r.resource_type} · {r.resource_price ? `₹${Number(r.resource_price).toLocaleString("en-IN")}${r.resource_unit || ""}` : "No price"} · {timeAgo(r.created_at)}</span>
                                    {r.message && <p className="req-message">{r.message}</p>}
                                </div>
                                {r.status === "pending" ? (
                                    <div className="req-card-actions">
                                        <button className="req-btn req-accept" disabled={busyId === r.request_id} onClick={() => handleAction(r.request_id, "accepted")}>Accept</button>
                                        <button className="req-btn req-decline" disabled={busyId === r.request_id} onClick={() => handleAction(r.request_id, "declined")}>Decline</button>
                                    </div>
                                ) : (
                                    <span className={`req-status-pill ${statusClasses[r.status] || "status-reserved"}`}>● {statusLabels[r.status] || r.status}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="req-column">
                        <div className="req-column-head">
                            <Icon name="arrow-up"/>
                            <h2>Outgoing Requests</h2>
                        </div>

                        {outgoing.length === 0 ? (
                            <EmptyState icon="arrow-up" title="No outgoing requests" sub="Request a resource from Find Resources to see it here."/>
                        ) : outgoing.map((r) => (
                            <div className="req-card outgoing" key={r.request_id}>
                                <div className="req-card-info">
                                    <h3>{r.resource_title}</h3>
                                    <p>To · {r.receiver_name}</p>
                                    <span className="req-meta">{r.resource_type} · {r.resource_location || "No location"} · {timeAgo(r.created_at)}</span>
                                    {r.message && <p className="req-message">{r.message}</p>}
                                </div>
                                <span className={`req-status-pill ${statusClasses[r.status] || "status-reserved"}`}>● {statusLabels[r.status] || r.status}</span>
                                {r.status === "pending" && (
                                    <div className="req-card-actions">
                                        <button className="req-btn req-decline" disabled={busyId === r.request_id} onClick={() => handleAction(r.request_id, "declined")}>Cancel</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default Requests