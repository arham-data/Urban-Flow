import { useState, useEffect } from "react"
import Icon from "./Icon.jsx"

const API = "https://backend-production-4068.up.railway.app"

const fillClasses = ["", "fill-blue", "fill-green", "fill-amber", "fill-red"]

function Analytics(){
    const [resources, setResources] = useState([])
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const userId = user.id

    useEffect(() => {
        Promise.all([
            fetch(`${API}/api/resources`).then(r => r.json()),
            userId ? fetch(`${API}/api/requests/user/${userId}`).then(r => r.json()) : Promise.resolve({incoming: [], outgoing: []})
        ])
        .then(([resData, reqData]) => {
            setResources(resData.resources || [])
            setRequests([...(reqData.incoming || []), ...(reqData.outgoing || [])])
            setLoading(false)
        })
        .catch(() => setLoading(false))
    }, [userId])

    const total = resources.length
    const available = resources.filter(r => r.status === "available").length
    const pendingRequests = requests.filter(r => r.status === "pending").length
    const activeOps = requests.filter(r => r.status === "accepted").length

    const typeCounts = {}
    resources.forEach(r => {
        typeCounts[r.type] = (typeCounts[r.type] || 0) + 1
    })
    const typeBreakdown = Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => ({type, count, pct: total ? Math.round(count / total * 100) : 0}))

    if (loading) return (
        <p style={{textAlign:"center",color:"var(--muted)",padding:"80px 0"}}>Loading analytics...</p>
    )

    return(
        <div className="an-page">

            <div className="an-title">
                <h1>Analytics</h1>
                <p>Performance of your resource network this month.</p>
            </div>

            <div className="an-kpis">
                <div className="an-kpi">
                    <span className="an-kpi-label">Resources on Network</span>
                    <span className="an-kpi-value">{total}</span>
                </div>
                <div className="an-kpi">
                    <span className="an-kpi-label">Available Now</span>
                    <span className="an-kpi-value">{available}</span>
                </div>
                <div className="an-kpi">
                    <span className="an-kpi-label">Pending Requests</span>
                    <span className="an-kpi-value">{pendingRequests}</span>
                </div>
                <div className="an-kpi">
                    <span className="an-kpi-label">Active Operations</span>
                    <span className="an-kpi-value">{activeOps}</span>
                </div>
            </div>

            <div className="an-section" style={{marginBottom: 16}}>
                <div className="an-section-head">
                    <Icon name="cubes"/>
                    <h2>By Resource Type</h2>
                </div>
                {typeBreakdown.length === 0 ? (
                    <p style={{padding:"16px 0",fontSize:"14px",color:"var(--muted)"}}>No resources to show yet.</p>
                ) : (
                    <div className="an-list">
                        {typeBreakdown.map((item, i) => (
                            <div className="an-list-row" key={item.type}>
                                <span className="an-list-name">{item.type}</span>
                                <div className="an-list-track">
                                    <div className={`an-list-fill ${fillClasses[i % fillClasses.length]}`} style={{width: `${item.pct}%`}}></div>
                                </div>
                                <span className="an-list-num">{item.pct}%</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="an-phase2">
                <div className="an-phase2-content">
                    <div className="an-section">
                        <div className="an-section-head">
                            <Icon name="time"/>
                            <h2>Peak Bookings</h2>
                        </div>
                        <div className="an-list">
                            <div className="an-list-row">
                                <span className="an-list-name">Morning · 8-11 AM</span>
                                <div className="an-list-track">
                                    <div className="an-list-fill fill-green" style={{width: "70%"}}></div>
                                </div>
                                <span className="an-list-num">70%</span>
                            </div>
                            <div className="an-list-row">
                                <span className="an-list-name">Midday · 12-3 PM</span>
                                <div className="an-list-track">
                                    <div className="an-list-fill" style={{width: "55%"}}></div>
                                </div>
                                <span className="an-list-num">55%</span>
                            </div>
                            <div className="an-list-row">
                                <span className="an-list-name">Evening · 4-7 PM</span>
                                <div className="an-list-track">
                                    <div className="an-list-fill fill-amber" style={{width: "40%"}}></div>
                                </div>
                                <span className="an-list-num">40%</span>
                            </div>
                            <div className="an-list-row">
                                <span className="an-list-name">Night · 8-11 PM</span>
                                <div className="an-list-track">
                                    <div className="an-list-fill fill-red" style={{width: "22%"}}></div>
                                </div>
                                <span className="an-list-num">22%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="an-phase2-veil">
                    <Icon name="lock" size={28}/>
                    <strong>Feature for Phase 2</strong>
                </div>
            </div>

            <div className="an-phase2" style={{marginTop: 16}}>
                <div className="an-phase2-content">
                    <div className="an-chart-section" style={{marginBottom: 0}}>
                        <div className="an-section-head">
                            <Icon name="trending"/>
                            <h2>Revenue Trend</h2>
                        </div>
                        <div className="an-bars">
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "35%"}}></div>
                                <span className="an-bar-label">Jan</span>
                            </div>
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "48%"}}></div>
                                <span className="an-bar-label">Feb</span>
                            </div>
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "42%"}}></div>
                                <span className="an-bar-label">Mar</span>
                            </div>
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "60%"}}></div>
                                <span className="an-bar-label">Apr</span>
                            </div>
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "72%"}}></div>
                                <span className="an-bar-label">May</span>
                            </div>
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "65%"}}></div>
                                <span className="an-bar-label">Jun</span>
                            </div>
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "85%"}}></div>
                                <span className="an-bar-label">Jul</span>
                            </div>
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "78%"}}></div>
                                <span className="an-bar-label">Aug</span>
                            </div>
                            <div className="an-bar-col">
                                <div className="an-bar" style={{height: "92%"}}></div>
                                <span className="an-bar-label">Sep</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="an-phase2-veil">
                    <Icon name="lock" size={28}/>
                    <strong>Feature for Phase 2</strong>
                </div>
            </div>

        </div>
    )
}

export default Analytics