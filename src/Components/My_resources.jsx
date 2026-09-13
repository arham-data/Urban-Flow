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

const emptyForm = {
    type: "Truck",
    title: "",
    location: "",
    description: "",
    price: "",
    price_unit: "/day",
    status: "available"
}

function MyResources(){
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)
    const [drawerMode, setDrawerMode] = useState(null)
    const [editId, setEditId] = useState(null)
    const [viewing, setViewing] = useState(null)
    const [error, setError] = useState("")
    const [reload, setReload] = useState(0)

    const [form, setForm] = useState(emptyForm)

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

    function openAdd(){
        setForm({...emptyForm})
        setEditId(null)
        setError("")
        setDrawerMode("add")
    }

    function openEdit(r){
        setForm({
            type: r.type,
            title: r.title,
            location: r.location || "",
            description: r.description || "",
            price: r.price || "",
            price_unit: r.price_unit || "/day",
            status: r.status
        })
        setEditId(r.resource_id)
        setError("")
        setDrawerMode("edit")
    }

    function openView(r){
        setViewing(r)
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

        const res = await fetch(`${API}/api/resources${editId ? `/${editId}` : ""}`, {
            method: editId ? "PUT" : "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        })

        const result = await res.json()

        if (res.ok){
            setDrawerMode(null)
            refreshResources()
        } else {
            setError(result.message || "Something went wrong")
        }
    }

    async function handleDelete(resourceId){
        const res = await fetch(`${API}/api/resources/${resourceId}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}
        })

        if (res.ok){
            setResources(prev => prev.filter(r => r.resource_id !== resourceId))
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
                <button className="mr-add-btn" onClick={openAdd}>
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
                    <button className="mr-add-btn" onClick={openAdd}>
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
                                <button className="mr-btn" onClick={() => openEdit(r)}>Edit</button>
                                <button className="mr-btn mr-btn-secondary" onClick={() => openView(r)}>View</button>
                                <button className="mr-btn mr-btn-danger" onClick={() => handleDelete(r.resource_id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {drawerMode && (
                <div className="drawer-overlay" onClick={() => setDrawerMode(null)}>
                    <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="drawer-head">
                            <h2>{drawerMode === "edit" ? "Edit Resource" : "Add Resource"}</h2>
                            <button className="drawer-close" onClick={() => setDrawerMode(null)}>
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

                            <button type="submit" className="drawer-submit">{drawerMode === "edit" ? "Save Changes" : "Add Resource"}</button>
                        </form>
                    </div>
                </div>
            )}

            {viewing && (
                <div className="drawer-overlay" onClick={() => setViewing(null)}>
                    <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="drawer-head">
                            <h2>Resource Details</h2>
                            <button className="drawer-close" onClick={() => setViewing(null)}>
                                <Icon name="circle" size={18}/>
                            </button>
                        </div>

                        <div className="mr-view">
                            <div className="mr-view-type">
                                <Icon name={typeIcons[viewing.type] || "circle"}/>
                                <span>{viewing.type}</span>
                            </div>

                            <span className={`mr-status-pill ${statusClasses[viewing.status] || "status-available"}`}>
                                ● {statusLabels[viewing.status] || viewing.status}
                            </span>

                            <h2>{viewing.title}</h2>

                            {viewing.location && (
                                <p className="mr-view-row">
                                    <Icon name="location"/>
                                    <span>{viewing.location}</span>
                                </p>
                            )}

                            <div className="mr-view-grid">
                                <div className="mr-view-cell">
                                    <span>Price</span>
                                    <strong>{viewing.price ? `₹${Number(viewing.price).toLocaleString("en-IN")}` : "—"}</strong>
                                </div>
                                <div className="mr-view-cell">
                                    <span>Unit</span>
                                    <strong>{viewing.price_unit || "—"}</strong>
                                </div>
                            </div>

                            {viewing.description && (
                                <div className="mr-view-desc">
                                    <span>Description</span>
                                    <p>{viewing.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default MyResources