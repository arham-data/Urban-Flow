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

const statusClasses = {
    "available": "status-available",
    "unavailable": "status-unavailable",
    "partial": "status-partial",
    "reserved": "status-reserved"
}

const statusLabels = {
    "available": "Available",
    "unavailable": "Unavailable",
    "partial": "Partially Available",
    "reserved": "Reserved"
}

function FindResource(){
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [message, setMessage] = useState("")
    const [sending, setSending] = useState(false)
    const [error, setError] = useState("")
    const [requestedIds, setRequestedIds] = useState(new Set())
    const [reload, setReload] = useState(0)

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const userId = user.id

    useEffect(() => {
        fetch(`${API}/api/resources`)
            .then(res => res.json())
            .then(data => {
                setResources(data.resources || [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (!userId) return
        fetch(`${API}/api/requests/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                const ids = new Set()
                ;[...(data.outgoing || [])].forEach(r => {
                    if (r.status === "pending" || r.status === "accepted") ids.add(r.resource_id)
                })
                setRequestedIds(ids)
            })
            .catch(() => {})
    }, [userId, reload])

    function openRequestDrawer(r){
        setSelected(r)
        setMessage("")
        setError("")
        setDrawerOpen(true)
    }

    async function handleSendRequest(e){
        e.preventDefault()
        if (!userId){
            setError("Please login to request a resource")
            return
        }
        setSending(true)
        const res = await fetch(`${API}/api/requests`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({sender_id: userId, resource_id: selected.resource_id, message})
        })
        const result = await res.json()
        setSending(false)

        if (res.ok){
            setDrawerOpen(false)
            setReload(n => n + 1)
        } else {
            setError(result.message || "Could not send request")
        }
    }

    const query = search.trim().toLowerCase()
    const filtered = query
        ? resources.filter(r =>
            (r.title || "").toLowerCase().includes(query) ||
            (r.location || "").toLowerCase().includes(query) ||
            (r.type || "").toLowerCase().includes(query)
          )
        : resources

    return(
        <div className="fr-page">

            <div className="fr-header">
                <div className="fr-title">
                    <h1>Find Resources</h1>
                    <p>Browse live listings from providers across the network.</p>
                </div>
                <div className="fr-search">
                    <Icon name="search"/>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, type or location..."/>
                </div>
            </div>

            {loading ? (
                <p style={{textAlign:"center",color:"var(--muted)",padding:"80px 0"}}>Loading resources...</p>
            ) : filtered.length === 0 ? (
                <div style={{textAlign:"center",padding:"80px 0"}}>
                    <Icon name="cube" size={40} className="fr-empty-icon"/>
                    <p style={{fontSize:"18px",fontWeight:600,color:"var(--ink)",margin:"16px 0 6px"}}>{search ? "No matching resources" : "No resources listed yet"}</p>
                    <p style={{fontSize:"14px",color:"var(--muted)"}}>{search ? "Try a different search term." : "Be the first to add a resource to the network."}</p>
                </div>
            ) : (
                <div className="fr-grid">
                    {filtered.map((r) => {

                        const isOwn = userId && String(r.user_id) === String(userId)
                        const requested = requestedIds.has(r.resource_id)

                        let button
                        if (isOwn){
                            button = <button className="fr-action" disabled>Your resource</button>
                        } else if (requested){
                            button = <button className="fr-action" disabled>Requested</button>
                        } else {
                            button = <button className="fr-action" onClick={() => openRequestDrawer(r)}>Request Resource</button>
                        }

                        return (
                            <div className="fr-card" key={r.resource_id}>
                                <div className="fr-card-top">
                                    <div className="fr-type-badge">
                                        <Icon name={typeIcons[r.type] || "circle"}/>
                                        <span>{r.type}</span>
                                    </div>
                                    <span className={`fr-status-pill ${statusClasses[r.status] || "status-available"}`}>
                                        ● {statusLabels[r.status] || r.status}
                                    </span>
                                </div>
                                <div className="fr-card-title">
                                    <h3>{r.title}</h3>
                                    <span className="fr-updated">Listed by {r.owner_name}</span>
                                </div>
                                {r.location && (
                                    <div className="fr-location">
                                        <Icon name="location"/>
                                        <span>{r.location}</span>
                                    </div>
                                )}
                                <div className="fr-stats">
                                    <div className="fr-stat">
                                        <span className="fr-stat-label">Type</span>
                                        <span className="fr-stat-value">{r.type}</span>
                                    </div>
                                    <div className="fr-stat">
                                        <span className="fr-stat-label">Price</span>
                                        <span className="fr-stat-value">{r.price ? `₹${Number(r.price).toLocaleString("en-IN")}` : "—"}</span>
                                    </div>
                                    <div className="fr-stat">
                                        <span className="fr-stat-label">Unit</span>
                                        <span className="fr-stat-value">{r.price_unit || "—"}</span>
                                    </div>
                                    <div className="fr-stat">
                                        <span className="fr-stat-label">Status</span>
                                        <span className="fr-stat-value">{statusLabels[r.status] || r.status}</span>
                                    </div>
                                </div>
                                <div className="fr-card-footer">
                                    <div className="fr-provider">
                                        <span>{r.owner_name}</span>
                                        <Icon name="check" className="verified"/>
                                    </div>
                                    <div className="fr-price">
                                        <span className="fr-price-value">{r.price ? `₹${Number(r.price).toLocaleString("en-IN")}` : "—"}</span>
                                        <span className="fr-price-unit">{r.price_unit}</span>
                                    </div>
                                    {button}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {drawerOpen && (
                <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
                    <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="drawer-head">
                            <h2>Request Resource</h2>
                            <button className="drawer-close" onClick={() => setDrawerOpen(false)}>
                                <Icon name="circle" size={18}/>
                            </button>
                        </div>

                        {selected && (
                            <div className="fr-request-preview">
                                <div className="fr-type-badge">
                                    <Icon name={typeIcons[selected.type] || "circle"}/>
                                    <span>{selected.type}</span>
                                </div>
                                <h3>{selected.title}</h3>
                                <p>Provided by {selected.owner_name}{selected.location ? ` · ${selected.location}` : ""}</p>
                                <span className="req-meta">{selected.price ? `₹${Number(selected.price).toLocaleString("en-IN")}${selected.price_unit || ""}` : "No price"} · {statusLabels[selected.status] || selected.status}</span>
                            </div>
                        )}

                        <form onSubmit={handleSendRequest} className="drawer-form">
                            <label>Message (optional)</label>
                            <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. Need this truck on Tuesday for 4 hours..." rows={4}/>

                            {error && (
                                <div className="drawer-error">
                                    <p>{error}</p>
                                </div>
                            )}

                            <button type="submit" className="drawer-submit" disabled={sending}>
                                {sending ? "Sending..." : "Send Request"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default FindResource