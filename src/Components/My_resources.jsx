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

function MyResources(){
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [error, setError] = useState("")
    const [reload, setReload] = useState(0)

    const [form, setForm] = useState({
        type: "Truck",
        title: "",
        location: "",
        description: "",
        price: "",
        price_unit: "/day",
        status: "available"
    })

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const userId = user.id

    useEffect(() => {
        if (!userId) return
        fetch(`${API}/api/resources/mine/${userId}`)
            .then(res => res.json())
            .then(data => {
                setResources(data.resources || [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [userId, reload])

    function refreshResources(){
        setLoading(true)
        setReload(n => n + 1)
    }

    function handleFormChange(e){
        const {name, value} = e.target
        setForm(prev => ({...prev, [name]: value}))
    }

    function openDrawer(){
        setForm({
            type: "Truck",
            title: "",
            location: "",
            description: "",
            price: "",
            price_unit: "/day",
            status: "available"
        })
        setError("")
        setDrawerOpen(true)
    }

    async function handleSubmit(e){
        e.preventDefault()

        if (!form.title.trim()){
            setError("Title is required")
            return
        }

        const body = {
            ...form,
            user_id: userId,
            price: form.price ? parseFloat(form.price) : null
        }

        const res = await fetch(`${API}/api/resources`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        })

        const result = await res.json()

        if (res.ok){
            setDrawerOpen(false)
            refreshResources()
        } else {
            setError(result.message)
        }
    }

    async function handleDeactivate(resourceId){
        const res = await fetch(`${API}/api/resources/${resourceId}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({status: "unavailable"})
        })

        if (res.ok){
            setResources(prev => prev.map(r =>
                r.resource_id === resourceId ? {...r, status: "unavailable"} : r
            ))
        }
    }

    const total = resources.length
    const available = resources.filter(r => r.status === "available").length
    const partial = resources.filter(r => r.status === "partial").length
    const unavailable = resources.filter(r => r.status === "unavailable" || r.status === "reserved").length

    return(
        <div className="mr-page">

            <div className="mr-header">
                <div className="mr-title">
                    <h1>My Resources</h1>
                    <p>Manage everything you've listed on the UrbanFlow network.</p>
                </div>
                <button className="mr-add-btn" onClick={openDrawer}>
                    <Icon name="add"/>
                    Add Resource
                </button>
            </div>

            <div className="mr-filters">
                <div className="mr-stat">
                    <span className="mr-stat-value">{total}</span>
                    <span className="mr-stat-label">Total listed</span>
                </div>
                <div className="mr-stat">
                    <span className="mr-stat-value">{available}</span>
                    <span className="mr-stat-label">Available</span>
                </div>
                <div className="mr-stat">
                    <span className="mr-stat-value">{partial}</span>
                    <span className="mr-stat-label">Partial</span>
                </div>
                <div className="mr-stat">
                    <span className="mr-stat-value">{unavailable}</span>
                    <span className="mr-stat-label">Unavailable</span>
                </div>
            </div>

            {loading ? (
                <p style={{textAlign:"center",color:"var(--muted)",padding:"80px 0"}}>Loading your resources...</p>
            ) : resources.length === 0 ? (
                <div style={{textAlign:"center",padding:"80px 0"}}>
                    <Icon name="folder" size={40}/>
                    <p style={{fontSize:"18px",fontWeight:600,color:"var(--ink)",margin:"16px 0 6px"}}>No resources yet</p>
                    <p style={{fontSize:"14px",color:"var(--muted)",marginBottom:"24px"}}>Add your first resource to get started.</p>
                    <button className="mr-add-btn" onClick={openDrawer}>
                        <Icon name="add"/>
                        Add Resource
                    </button>
                </div>
            ) : (
                <div className="mr-grid">
                    {resources.map((r) => (
                        <div className="mr-card" key={r.resource_id}>
                            <div className="mr-card-top">
                                <div className="mr-type-badge">
                                    <Icon name={typeIcons[r.type] || "circle"}/>
                                    <span>{r.type}</span>
                                </div>
                                <span className={`mr-status-pill ${statusClasses[r.status] || "status-available"}`}>
                                    ● {statusLabels[r.status] || r.status}
                                </span>
                            </div>
                            <div className="mr-card-title">
                                <h3>{r.title}</h3>
                                <span className="mr-updated">{r.location || "Location not set"}</span>
                            </div>
                            <div className="mr-stats">
                                <div className="mr-stat">
                                    <span className="mr-stat-label">Type</span>
                                    <span className="mr-stat-value">{r.type}</span>
                                </div>
                                <div className="mr-stat">
                                    <span className="mr-stat-label">Price</span>
                                    <span className="mr-stat-value">{r.price ? `₹${Number(r.price).toLocaleString("en-IN")}` : "—"}</span>
                                </div>
                                <div className="mr-stat">
                                    <span className="mr-stat-label">Unit</span>
                                    <span className="mr-stat-value">{r.price_unit || "—"}</span>
                                </div>
                                <div className="mr-stat">
                                    <span className="mr-stat-label">Status</span>
                                    <span className="mr-stat-value">{statusLabels[r.status] || r.status}</span>
                                </div>
                            </div>
                            <div className="mr-card-actions">
                                <button className="mr-btn" disabled title="Coming soon">Edit</button>
                                <button className="mr-btn mr-btn-secondary" disabled title="Coming soon">View</button>
                                <button
                                    className="mr-btn mr-btn-danger"
                                    disabled={r.status === "unavailable"}
                                    onClick={() => handleDeactivate(r.resource_id)}
                                >
                                    {r.status === "unavailable" ? "Delisted" : "Deactivate"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {drawerOpen && (
                <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}>
                    <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="drawer-head">
                            <h2>Add Resource</h2>
                            <button className="drawer-close" onClick={() => setDrawerOpen(false)}>
                                <Icon name="circle" size={18}/>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="drawer-form">
                            <label>Resource Type</label>
                            <select name="type" value={form.type} onChange={handleFormChange} required>
                                <option value="Truck">Truck</option>
                                <option value="Warehouse">Warehouse</option>
                                <option value="Storage">Storage</option>
                                <option value="Inventory">Inventory</option>
                                <option value="Empty Space">Empty Space</option>
                            </select>

                            <label>Title</label>
                            <input name="title" value={form.title} onChange={handleFormChange} placeholder="e.g. Tata 407 — Medium Cargo Truck" required/>

                            <label>Location</label>
                            <input name="location" value={form.location} onChange={handleFormChange} placeholder="e.g. Okhla, New Delhi"/>

                            <label>Description</label>
                            <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Brief description of the resource..." rows={3}/>

                            <div className="drawer-row">
                                <div className="drawer-field">
                                    <label>Price</label>
                                    <input name="price" value={form.price} onChange={handleFormChange} placeholder="e.g. 1800" type="number" min="0"/>
                                </div>
                                <div className="drawer-field">
                                    <label>Unit</label>
                                    <select name="price_unit" value={form.price_unit} onChange={handleFormChange}>
                                        <option value="/day">/day</option>
                                        <option value="/sq ft/mo">/sq ft/mo</option>
                                        <option value="/unit">/unit</option>
                                        <option value="/month">/month</option>
                                        <option value="/trip">/trip</option>
                                    </select>
                                </div>
                            </div>

                            <label>Status</label>
                            <select name="status" value={form.status} onChange={handleFormChange}>
                                <option value="available">Available</option>
                                <option value="partial">Partially Available</option>
                                <option value="reserved">Reserved</option>
                                <option value="unavailable">Unavailable</option>
                            </select>

                            {error && (
                                <div className="drawer-error">
                                    <p>{error}</p>
                                </div>
                            )}

                            <button type="submit" className="drawer-submit">Add Resource</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default MyResources
