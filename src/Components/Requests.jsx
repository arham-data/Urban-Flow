import Icon from "./Icon.jsx"

function Requests(){
    return(
        <div className="req-page">

            <div className="req-title">
                <h1>Requests</h1>
                <p>Incoming and outgoing resource requests across your network.</p>
            </div>

            <div className="req-kpis">
                <div className="req-kpi">
                    <span className="req-kpi-value">5</span>
                    <span className="req-kpi-label">Incoming</span>
                </div>
                <div className="req-kpi">
                    <span className="req-kpi-value">3</span>
                    <span className="req-kpi-label">Outgoing</span>
                </div>
                <div className="req-kpi">
                    <span className="req-kpi-value">4</span>
                    <span className="req-kpi-label">Pending</span>
                </div>
                <div className="req-kpi">
                    <span className="req-kpi-value">32</span>
                    <span className="req-kpi-label">Completed</span>
                </div>
            </div>

            <div className="req-columns">
                <div className="req-column">
                    <div className="req-column-head">
                        <Icon name="arrow-down"/>
                        <h2>Incoming Requests</h2>
                    </div>

                    <div className="req-card incoming">
                        <div className="req-card-info">
                            <h3>Truck Request · Tata 407</h3>
                            <p>Rahul Verma · Okhla</p>
                            <span className="req-meta">Today · 6 PM · 2.5 tonnes</span>
                        </div>
                        <div className="req-card-actions">
                            <button className="req-btn req-accept">Accept</button>
                            <button className="req-btn req-decline">Decline</button>
                        </div>
                    </div>

                    <div className="req-card incoming">
                        <div className="req-card-info">
                            <h3>Warehouse Request</h3>
                            <p>Priya Sharma · Sector 18</p>
                            <span className="req-meta">Tej · 3 months · 1,500 sq ft</span>
                        </div>
                        <div className="req-card-actions">
                            <button className="req-btn req-accept">Accept</button>
                            <button className="req-btn req-decline">Decline</button>
                        </div>
                    </div>

                    <div className="req-card incoming">
                        <div className="req-card-info">
                            <h3>Inventory Request · Boxes</h3>
                            <p>Amit Malhotra · Mayapuri</p>
                            <span className="req-meta">5,000 units · ₹8.50/unit</span>
                        </div>
                        <div className="req-card-actions">
                            <button className="req-btn req-accept">Accept</button>
                            <button className="req-btn req-decline">Decline</button>
                        </div>
                    </div>
                </div>

                <div className="req-column">
                    <div className="req-column-head">
                        <Icon name="arrow-up"/>
                        <h2>Outgoing Requests</h2>
                    </div>

                    <div className="req-card outgoing">
                        <div className="req-card-info">
                            <h3>Storage Unit Request</h3>
                            <p>To · SecureSpace Ltd</p>
                            <span className="req-status-pill status-reserved">● Pending</span>
                        </div>
                    </div>

                    <div className="req-card outgoing">
                        <div className="req-card-info">
                            <h3>Open Space Request</h3>
                            <p>To · Dwarka Parkings</p>
                            <span className="req-status-pill status-available">● Accepted</span>
                        </div>
                    </div>

                    <div className="req-card outgoing">
                        <div className="req-card-info">
                            <h3>Truck Request · Ashok Leyland</h3>
                            <p>To · Verma Transport</p>
                            <span className="req-status-pill status-partial">● Completed</span>
                        </div>
                    </div>

                    <div className="req-card outgoing">
                        <div className="req-card-info">
                            <h3>Warehouse Request</h3>
                            <p>To · Pithampur Storage</p>
                            <span className="req-status-pill status-unavailable">● Declined</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Requests