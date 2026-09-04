function ActiveOperation(){
    return(
        <div className="ao-page">

            <div className="ao-title">
                <h1>Active Operations</h1>
                <p>Track your live resource movements in real time.</p>
            </div>

            <div className="ao-layout">
                <div className="ao-map">
                    <ion-icon name="map-outline"></ion-icon>
                    <span className="ao-map-label">Live route map</span>
                </div>

                <div className="ao-list">
                    <div className="ao-card">
                        <div className="ao-card-head">
                            <div className="ao-type">
                                <ion-icon name="car-sport-outline"></ion-icon>
                                <span>Truck · Tata 407</span>
                            </div>
                            <span className="ao-status in-transit">● In Transit</span>
                        </div>
                        <div className="ao-route">
                            <span>Okhla</span>
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                            <span>Dwarka</span>
                        </div>
                        <div className="ao-progress">
                            <div className="ao-progress-track">
                                <div className="ao-progress-fill" style={{width: "65%"}}></div>
                            </div>
                            <span className="ao-progress-num">65%</span>
                        </div>
                        <div className="ao-meta">
                            <span>ETA · 1h 20m</span>
                            <span>Rahul Verma</span>
                        </div>
                        <div className="ao-actions">
                            <button className="ao-btn">Track</button>
                            <button className="ao-btn ao-btn-secondary">Message</button>
                        </div>
                    </div>

                    <div className="ao-card">
                        <div className="ao-card-head">
                            <div className="ao-type">
                                <ion-icon name="archive-outline"></ion-icon>
                                <span>Storage · Loading</span>
                            </div>
                            <span className="ao-status in-progress">● In Progress</span>
                        </div>
                        <div className="ao-route">
                            <span>Sector 18</span>
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                            <span>Udyog Vihar</span>
                        </div>
                        <div className="ao-progress">
                            <div className="ao-progress-track">
                                <div className="ao-progress-fill" style={{width: "40%"}}></div>
                            </div>
                            <span className="ao-progress-num">40%</span>
                        </div>
                        <div className="ao-meta">
                            <span>ETA · 2h 05m</span>
                            <span>Priya Sharma</span>
                        </div>
                        <div className="ao-actions">
                            <button className="ao-btn">Track</button>
                            <button className="ao-btn ao-btn-input">Mark Complete</button>
                            <button className="ao-btn ao-btn-secondary">Message</button>
                        </div>
                    </div>

                    <div className="ao-card">
                        <div className="ao-card-head">
                            <div className="ao-type">
                                <ion-icon name="cube-outline"></ion-icon>
                                <span>Inventory · Delivery</span>
                            </div>
                            <span className="ao-status in-transit">● In Transit</span>
                        </div>
                        <div className="ao-route">
                            <span>Mayapuri</span>
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                            <span>Karol Bagh</span>
                        </div>
                        <div className="ao-progress">
                            <div className="ao-progress-track">
                                <div className="ao-progress-fill" style={{width: "85%"}}></div>
                            </div>
                            <span className="ao-progress-num">85%</span>
                        </div>
                        <div className="ao-meta">
                            <span>ETA · 25 min</span>
                            <span>Amit Malhotra</span>
                        </div>
                        <div className="ao-actions">
                            <button className="ao-btn">Track</button>
                            <button className="ao-btn ao-btn-secondary">Message</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ActiveOperation
