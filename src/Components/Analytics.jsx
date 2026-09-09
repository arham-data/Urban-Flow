import Icon from "./Icon.jsx"

function Analytics(){
    return(
        <div className="an-page">

            <div className="an-title">
                <h1>Analytics</h1>
                <p>Performance of your resource network this month.</p>
            </div>

            <div className="an-kpis">
                <div className="an-kpi">
                    <span className="an-kpi-label">Total Revenue</span>
                    <span className="an-kpi-value">₹1,84,500</span>
                    <span className="an-kpi-delta up">▲ 12%</span>
                </div>
                <div className="an-kpi">
                    <span className="an-kpi-label">Transactions</span>
                    <span className="an-kpi-value">96</span>
                    <span className="an-kpi-delta up">▲ 8%</span>
                </div>
                <div className="an-kpi">
                    <span className="an-kpi-label">Resources Utilized</span>
                    <span className="an-kpi-value">78%</span>
                    <span className="an-kpi-delta up">▲ 5%</span>
                </div>
                <div className="an-kpi">
                    <span className="an-kpi-label">Avg Rating</span>
                    <span className="an-kpi-value">4.8</span>
                    <span className="an-kpi-delta down">▼ 0.1</span>
                </div>
            </div>

            <div className="an-chart-section">
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

            <div className="an-insights">
                <div className="an-section">
                    <div className="an-section-head">
                        <Icon name="cubes"/>
                        <h2>By Resource Type</h2>
                    </div>
                    <div className="an-list">
                        <div className="an-list-row">
                            <span className="an-list-name">Truck</span>
                            <div className="an-list-track">
                                <div className="an-list-fill" style={{width: "62%"}}></div>
                            </div>
                            <span className="an-list-num">62%</span>
                        </div>
                        <div className="an-list-row">
                            <span className="an-list-name">Warehouse</span>
                            <div className="an-list-track">
                                <div className="an-list-fill fill-blue" style={{width: "48%"}}></div>
                            </div>
                            <span className="an-list-num">48%</span>
                        </div>
                        <div className="an-list-row">
                            <span className="an-list-name">Storage</span>
                            <div className="an-list-track">
                                <div className="an-list-fill fill-green" style={{width: "35%"}}></div>
                            </div>
                            <span className="an-list-num">35%</span>
                        </div>
                        <div className="an-list-row">
                            <span className="an-list-name">Inventory</span>
                            <div className="an-list-track">
                                <div className="an-list-fill fill-amber" style={{width: "27%"}}></div>
                            </div>
                            <span className="an-list-num">27%</span>
                        </div>
                    </div>
                </div>

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

        </div>
    )
}

export default Analytics