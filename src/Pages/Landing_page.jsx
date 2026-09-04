import { Link } from "react-router-dom"

function Landing_page(){

    return(
        <>
        <main>

            <nav>
                <div className="n1">
                    <p>logo</p>
                    <p>UrbanFlow</p>
                </div>
                <div className="n2">
                    <p>How it Works</p>
                    <p>Resources</p>
                    <p>Impact</p>
                    <p>Login</p>
                    <Link to="/signup"><button>Get Started <span><ion-icon name="arrow-forward-outline"></ion-icon></span></button></Link>
                </div>
            </nav>

            <div className="hero">
                <div className="h1">
                    <div className="h1-1">CITY RESOURCE NETWORK / 01</div>
                    <div className="h1-2">Making <br></br>cities<br></br> flow better.</div>
                    <div className="h1-3">UrbanFlow connects underutilized resources with the people and businesses that need them—reducing logistics pressure and making cities more efficient.</div>
                    <div className="h1-4">
                        <button>Gets started <span><ion-icon name="arrow-forward-outline"></ion-icon></span></button>
                        <button>See how it works <span><ion-icon name="arrow-forward-outline"></ion-icon></span></button>
                    </div>
                </div>
                <div className="h2"></div>
            </div>

            <div className="sec-1">
                <div className="s1-1">
                    <p>02</p>
                    <p>THE COORDINATION GAP</p>
                </div>
                <div className="s1-2">
                    <div className="s-12l">Cities have resources. The problem is coordination.</div>
                    <div className="s-12r">
                        <p>Capacity is already moving through the city every day. UrbanFlow makes the invisible supply visible—and connects it to real-world demand.</p>
                        <p>Understand the Gap 
                            <span><ion-icon name="arrow-forward-outline"></ion-icon></span>
                        </p>
                    </div>
                </div>
                <div className="s1-3">
                    <div className="card">
                        <div className="c-logo">hru</div>
                        <div className="c-head">fheuhfie</div>
                        <div className="c-text">fwuifheufhi</div>
                    </div>
                </div>
            </div>

            <div className="sec-2">
                <div className="s2-1">
                    <p><ion-icon name="ellipse" size="small"></ion-icon> THE URBANFLOW LAYER / 03</p>
                </div>
                <div className="s2-2">
                    <div className="s2-copy">
                        <h2>One network.<br /><em>Better utilization.</em></h2>
                        <p>UrbanFlow is the coordination layer between what a city has and what it needs. One place to list, discover, match, and utilize.</p>
                        <button>Connect capacity <span><ion-icon name="arrow-forward-outline"></ion-icon></span></button>
                    </div>
                    <div className="s2-diagram">
                        <div className="flow-line"></div>
                        <div className="flow-node">
                            <p>SUPPLY</p>
                            <b>Available resources</b>
                            <small>Transport · Storage · Space</small>
                        </div>
                        <div className="flow-node central">
                            <p>COORDINATION</p>
                            <b>UrbanFlow</b>
                            <small>List · Discover · Match</small>
                        </div>
                        <div className="flow-node">
                            <p>DEMAND</p>
                            <b>People & businesses</b>
                            <small>Search · Select · Utilize</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sec-3">
                <div className="s3-1">
                    <p>04</p>
                    <p>RESOURCE CATEGORIES</p>
                </div>
                <div className="s3-2">
                    <h2>Use what's <br /><em>already here.</em></h2>
                    <p>From a spare truck to a temporary workspace, every resource can become part of a more efficient urban system.</p>
                </div>
                <div className="s3-3">
                    <button className="resource-item active">
                        <span className="resource-icon"><ion-icon name="car-outline"></ion-icon></span>
                        <span className="resource-copy">
                            <b>Transport</b>
                            <small>Trucks, delivery capacity and logistics resources.</small>
                        </span>
                        <ion-icon name="arrow-forward-outline" className="resource-arrow"></ion-icon>
                    </button>
                    <button className="resource-item">
                        <span className="resource-icon"><ion-icon name="business-outline"></ion-icon></span>
                        <span className="resource-copy">
                            <b>Storage</b>
                            <small>Warehouses and available storage capacity.</small>
                        </span>
                        <ion-icon name="arrow-forward-outline" className="resource-arrow"></ion-icon>
                    </button>
                    <button className="resource-item">
                        <span className="resource-icon"><ion-icon name="storefront-outline"></ion-icon></span>
                        <span className="resource-copy">
                            <b>Space</b>
                            <small>Unused or temporary urban spaces.</small>
                        </span>
                        <ion-icon name="arrow-forward-outline" className="resource-arrow"></ion-icon>
                    </button>
                    <button className="resource-item">
                        <span className="resource-icon"><ion-icon name="settings-outline"></ion-icon></span>
                        <span className="resource-copy">
                            <b>Equipment</b>
                            <small>Underutilized equipment and infrastructure.</small>
                        </span>
                        <ion-icon name="arrow-forward-outline" className="resource-arrow"></ion-icon>
                    </button>
                </div>
            </div>

            <div className="sec-4">
                <div className="s4-1">
                    <p><ion-icon name="ellipse" size="small"></ion-icon> IMPACT / 05</p>
                </div>
                <div className="s4-2">
                    <h2>Less pressure.<br /><em>Better utilization.</em></h2>
                    <p>UrbanFlow helps cities make progress without asking them to build more. Connect the capacity that already exists.</p>
                </div>
                <div className="s4-3">
                    <div className="impact-item">
                        <span>01</span>
                        <b>Higher resource<br />utilization</b>
                        <i></i>
                    </div>
                    <div className="impact-item">
                        <span>02</span>
                        <b>Fewer empty<br />trips</b>
                        <i></i>
                    </div>
                    <div className="impact-item">
                        <span>03</span>
                        <b>Lower logistics<br />pressure</b>
                        <i></i>
                    </div>
                    <div className="impact-item">
                        <span>04</span>
                        <b>Better urban<br />efficiency</b>
                        <i></i>
                    </div>
                </div>
            </div>

            <div className="sec-5">
                <div className="s5-1">
                    <p><ion-icon name="ellipse" size="small"></ion-icon> START WITH ONE RESOURCE</p>
                </div>
                <div className="s5-2">
                    <h2>Help build a more<br /><em>efficient city.</em></h2>
                    <p>Connect resources with demand and make better use of what cities already have.</p>
                    <Link to="/signup"><button>Get Started <span><ion-icon name="arrow-forward-outline"></ion-icon></span></button></Link>
                </div>
            </div>


            <div className="footer">
                <p>Urban</p>
                <span>Flow</span>
            </div>

        </main> 

        </>
    )
}

export default Landing_page