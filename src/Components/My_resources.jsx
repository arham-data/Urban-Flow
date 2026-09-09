import Icon from "./Icon.jsx"

function MyResources(){
    return(
        <div className="mr-page">

            <div className="mr-header">
                <div className="mr-title">
                    <h1>My Resources</h1>
                    <p>Manage everything you've listed on the UrbanFlow network.</p>
                </div>
                <button className="mr-add-btn">
                    <Icon name="add"/>
                    Add Resource
                </button>
            </div>

            <div className="mr-filters">
                <div className="mr-stat">
                    <span className="mr-stat-value">24</span>
                    <span className="mr-stat-label">Total listed</span>
                </div>
                <div className="mr-stat">
                    <span className="mr-stat-value">14</span>
                    <span className="mr-stat-label">Available</span>
                </div>
                <div className="mr-stat">
                    <span className="mr-stat-value">7</span>
                    <span className="mr-stat-label">Active</span>
                </div>
                <div className="mr-stat">
                    <span className="mr-stat-value">3</span>
                    <span className="mr-stat-label">Unavailable</span>
                </div>
            </div>

            <div className="mr-grid">

                <div className="mr-card">
                    <div className="mr-card-top">
                        <div className="mr-type-badge">
                            <Icon name="car"/>
                            <span>Truck</span>
                        </div>
                        <span className="mr-status-pill status-available">● Active</span>
                    </div>
                    <div className="mr-card-title">
                        <h3>Tata 407 — Medium Cargo Truck</h3>
                        <span className="mr-updated">Earnings · ₹2,400 today</span>
                    </div>
                    <div className="mr-stats">
                        <div className="mr-stat">
                            <span className="mr-stat-label">Capacity</span>
                            <span className="mr-stat-value">2.5 tonnes</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Price</span>
                            <span className="mr-stat-value">₹1,800/day</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Requests</span>
                            <span className="mr-stat-value">5 this week</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Views</span>
                            <span className="mr-stat-value">128</span>
                        </div>
                    </div>
                    <div className="mr-card-actions">
                        <button className="mr-btn">Edit</button>
                        <button className="mr-btn mr-btn-secondary">View</button>
                        <button className="mr-btn mr-btn-danger">Deactivate</button>
                    </div>
                </div>

                <div className="mr-card">
                    <div className="mr-card-top">
                        <div className="mr-type-badge">
                            <Icon name="business"/>
                            <span>Warehouse</span>
                        </div>
                        <span className="mr-status-pill status-available">● Available</span>
                    </div>
                    <div className="mr-card-title">
                        <h3>4,200 sq ft Warehouse</h3>
                        <span className="mr-updated">Sector 18, Noida</span>
                    </div>
                    <div className="mr-stats">
                        <div className="mr-stat">
                            <span className="mr-stat-label">Area</span>
                            <span className="mr-stat-value">4,200 sq ft</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Price</span>
                            <span className="mr-stat-value">₹18/sq ft/mo</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Requests</span>
                            <span className="mr-stat-value">2 this week</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Views</span>
                            <span className="mr-stat-value">76</span>
                        </div>
                    </div>
                    <div className="mr-card-actions">
                        <button className="mr-btn">Edit</button>
                        <button className="mr-btn mr-btn-secondary">View</button>
                        <button className="mr-btn mr-btn-danger">Deactivate</button>
                    </div>
                </div>

                <div className="mr-card">
                    <div className="mr-card-top">
                        <div className="mr-type-badge">
                            <Icon name="archive"/>
                            <span>Storage</span>
                        </div>
                        <span className="mr-status-pill status-partial">● Partially</span>
                    </div>
                    <div className="mr-card-title">
                        <h3>Climate-Controlled Storage Unit</h3>
                        <span className="mr-updated">Udyog Vihar, Gurugram</span>
                    </div>
                    <div className="mr-stats">
                        <div className="mr-stat">
                            <span className="mr-stat-label">Available</span>
                            <span className="mr-stat-value">1,200 sq ft</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Price</span>
                            <span className="mr-stat-value">₹350/sq ft/mo</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Requests</span>
                            <span className="mr-stat-value">1 this week</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Views</span>
                            <span className="mr-stat-value">41</span>
                        </div>
                    </div>
                    <div className="mr-card-actions">
                        <button className="mr-btn">Edit</button>
                        <button className="mr-btn mr-btn-secondary">View</button>
                        <button className="mr-btn mr-btn-danger">Deactivate</button>
                    </div>
                </div>

                <div className="mr-card">
                    <div className="mr-card-top">
                        <div className="mr-type-badge">
                            <Icon name="cube"/>
                            <span>Inventory</span>
                        </div>
                        <span className="mr-status-pill status-unavailable">● Unavailable</span>
                    </div>
                    <div className="mr-card-title">
                        <h3>Corrugated Packaging Boxes</h3>
                        <span className="mr-updated">Mayapuri · Low stock</span>
                    </div>
                    <div className="mr-stats">
                        <div className="mr-stat">
                            <span className="mr-stat-label">Quantity</span>
                            <span className="mr-stat-value">2,100 units</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Price</span>
                            <span className="mr-stat-value">₹8.50/unit</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Requests</span>
                            <span className="mr-stat-value">0 this week</span>
                        </div>
                        <div className="mr-stat">
                            <span className="mr-stat-label">Views</span>
                            <span className="mr-stat-value">19</span>
                        </div>
                    </div>
                    <div className="mr-card-actions">
                        <button className="mr-btn">Edit</button>
                        <button className="mr-btn mr-btn-secondary">View</button>
                        <button className="mr-btn mr-btn-danger">Reactivate</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyResources