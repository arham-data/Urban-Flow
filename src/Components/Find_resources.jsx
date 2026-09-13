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

    useEffect(() => {
        fetch(`${API}/api/resources`)
            .then(res => res.json())
            .then(data => {
                setResources(data.resources || [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return(
        <div className="fr-page">

            {loading ? (
                <p style={{textAlign:"center",color:"var(--muted)",padding:"80px 0"}}>Loading resources...</p>
            ) : resources.length === 0 ? (
                <div style={{textAlign:"center",padding:"80px 0"}}>
                    <Icon name="cube" size={40} className="fr-empty-icon"/>
                    <p style={{fontSize:"18px",fontWeight:600,color:"var(--ink)",margin:"16px 0 6px"}}>No resources listed yet</p>
                    <p style={{fontSize:"14px",color:"var(--muted)"}}>Be the first to add a resource to the network.</p>
                </div>
            ) : (
                <div className="fr-grid">
                    {resources.map((r) => (
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
                                <button className="fr-action" disabled title="Coming soon">Request Resource</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default FindResource
