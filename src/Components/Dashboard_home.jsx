function DashboardHome(){
    return(
        <div className="dhome-page">

            <div className="dhome-hero">
                <div className="dhome-hero-text">
                    <h1>Welcome back, Arham</h1>
                    <p>Your live city resource network is ready. Here's what's happening right now.</p>
                </div>
                <button className="dhome-hero-btn">Find Resources</button>
            </div>

            <div className="dhome-grid">
                <div className="dhome-tile">
                    <ion-icon name="pulse-outline"></ion-icon>
                    <span className="dhome-tile-value">3</span>
                    <span className="dhome-tile-label">Active operations</span>
                </div>
                <div className="dhome-tile">
                    <ion-icon name="cube-outline"></ion-icon>
                    <span className="dhome-tile-value">14</span>
                    <span className="dhome-tile-label">Resources available</span>
                </div>
                <div className="dhome-tile">
                    <ion-icon name="swap-horizontal-outline"></ion-icon>
                    <span className="dhome-tile-value">5</span>
                    <span className="dhome-tile-label">Pending requests</span>
                </div>
                <div className="dhome-tile">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <span className="dhome-tile-value">92</span>
                    <span className="dhome-tile-label">Trust score</span>
                </div>
            </div>

            <div className="dhome-sections">
                <div className="dhome-section">
                    <div className="dhome-section-head">
                        <ion-icon name="time-outline"></ion-icon>
                        <h2>Recent Activity</h2>
                    </div>
                    <div className="dhome-activity">
                        <div className="dhome-activity-item">
                            <span className="dhome-activity-dot activity-green"></span>
                            <span className="dhome-activity-text">Truck request accepted by Rahul Verma</span>
                            <span className="dhome-activity-time">5 min ago</span>
                        </div>
                        <div className="dhome-activity-item">
                            <span className="dhome-activity-dot activity-blue"></span>
                            <span className="dhome-activity-text">Warehouse listing viewed 12 times</span>
                            <span className="dhome-activity-time">32 min ago</span>
                        </div>
                        <div className="dhome-activity-item">
                            <span className="dhome-activity-dot activity-amber"></span>
                            <span className="dhome-activity-text">New request for corrugated boxes</span>
                            <span className="dhome-activity-time">1 hr ago</span>
                        </div>
                        <div className="dhome-activity-item">
                            <span className="dhome-activity-dot activity-green"></span>
                            <span className="dhome-activity-text">Payment received · ₹18,000</span>
                            <span className="dhome-activity-time">2 hrs ago</span>
                        </div>
                    </div>
                </div>

                <div className="dhome-section">
                    <div className="dhome-section-head">
                        <ion-icon name="radio-outline"></ion-icon>
                        <h2>Live Network</h2>
                    </div>
                    <div className="dhome-live">
                        <div className="dhome-live-row">
                            <span className="dhome-live-status status-available">● Available</span>
                            <span className="dhome-live-text">128 resources near you</span>
                        </div>
                        <div className="dhome-live-row">
                            <span className="dhome-live-status status-partial">● Partial</span>
                            <span className="dhome-live-text">31 nearby resources</span>
                        </div>
                        <div className="dhome-live-row">
                            <span className="dhome-live-status status-reserved">● Reserved</span>
                            <span className="dhome-live-text">9 reserved today</span>
                        </div>
                        <div className="dhome-live-row">
                            <span className="dhome-live-status status-unavailable">● Unavailable</span>
                            <span className="dhome-live-text">4 offline now</span>
                        </div>
                        <button className="dhome-live-btn">Browse marketplace</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardHome
