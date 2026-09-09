import Icon from "./Icon.jsx"

function Profile(){
    return(
        <div className="profile-page">

            <div className="profile-hero">
                <div className="profile-avatar">
                    <Icon name="user"/>
                </div>
                <div className="profile-id">
                    <div className="profile-name-row">
                        <h1>Arham Jain</h1>
                        <span className="profile-verified">
                            <Icon name="check"/>
                            Verified
                        </span>
                    </div>
                    <span className="profile-username">@arhamjain</span>
                    <span className="profile-type">Business Account · Verified</span>
                    <div className="profile-meta">
                        <span>
                            <Icon name="location"/>
                            Delhi, India
                        </span>
                        <span>
                            <Icon name="calendar"/>
                            Member since 2026
                        </span>
                    </div>
                </div>
                <button className="profile-edit">Edit Profile</button>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="card"/>
                    <h2>Personal Information</h2>
                </div>
                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="profile-stat-label">Full name</span>
                        <span className="profile-stat-value">Arham Jain</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Phone</span>
                        <span className="profile-stat-value">+91 98•••• ••12</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Email</span>
                        <span className="profile-stat-value">ar****@gmail.com</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Location</span>
                        <span className="profile-stat-value">Delhi, India</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Date of birth</span>
                        <span className="profile-stat-value">•• / •• / 2001</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Preferred language</span>
                        <span className="profile-stat-value">English</span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="business"/>
                    <h2>Business Information</h2>
                </div>
                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="profile-stat-label">Business name</span>
                        <span className="profile-stat-value">UrbanFlow Logistics</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Business type</span>
                        <span className="profile-stat-value">Transport &amp; Warehousing</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Business address</span>
                        <span className="profile-stat-value">Okhla Phase II, New Delhi</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">GST ID</span>
                        <span className="profile-stat-value">07ABCDE•••••1Z</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Verification status</span>
                        <span className="profile-stat-value">
                            Verified
                            <Icon name="check" className="verified"/>
                        </span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-label">Website / Contact</span>
                        <span className="profile-stat-value">urbanflow.in</span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="shield"/>
                    <h2>Trust &amp; Verification</h2>
                </div>
                <div className="profile-trust">
                    <div className="profile-trust-score">
                        <div className="profile-score-ring">
                            <span>92</span>
                            <small>/100</small>
                        </div>
                        <div className="profile-score-meta">
                            <strong>Trust Score</strong>
                            <span>Based on verification, transactions &amp; ratings</span>
                        </div>
                    </div>
                    <div className="profile-verify-list">
                        <div className="profile-verify-item">
                            <span>Phone</span>
                            <Icon name="check" className="verified"/>
                        </div>
                        <div className="profile-verify-item">
                            <span>Email</span>
                            <Icon name="check" className="verified"/>
                        </div>
                        <div className="profile-verify-item">
                            <span>Identity</span>
                            <Icon name="check" className="verified"/>
                        </div>
                        <div className="profile-verify-item">
                            <span>Business</span>
                            <Icon name="check" className="verified"/>
                        </div>
                        <div className="profile-verify-item">
                            <span>Address</span>
                            <Icon name="circle"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="pulse"/>
                    <h2>My Activity</h2>
                </div>
                <div className="profile-stat-grid">
                    <div className="profile-tile">
                        <span className="profile-tile-value">24</span>
                        <span className="profile-tile-label">Resources listed</span>
                    </div>
                    <div className="profile-tile">
                        <span className="profile-tile-value">18</span>
                        <span className="profile-tile-label">Resources rented / used</span>
                    </div>
                    <div className="profile-tile">
                        <span className="profile-tile-value">32</span>
                        <span className="profile-tile-label">Completed requests</span>
                    </div>
                    <div className="profile-tile">
                        <span className="profile-tile-value">3</span>
                        <span className="profile-tile-label">Active operations</span>
                    </div>
                    <div className="profile-tile">
                        <span className="profile-tile-value">96</span>
                        <span className="profile-tile-label">Successful transactions</span>
                    </div>
                    <div className="profile-tile">
                        <span className="profile-tile-value">4.8</span>
                        <span className="profile-tile-label">Average rating</span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="star"/>
                    <h2>Your UrbanFlow Reputation</h2>
                </div>
                <div className="profile-reputation">
                    <div className="profile-rep-main">
                        <Icon name="star"/>
                        <span className="profile-rep-value">4.8</span>
                        <span className="profile-rep-label">overall rating</span>
                    </div>
                    <div className="profile-rep-stats">
                        <div className="profile-rep-item">
                            <span className="profile-rep-num">126</span>
                            <span className="profile-rep-name">Reviews received</span>
                        </div>
                        <div className="profile-rep-item">
                            <span className="profile-rep-num">96</span>
                            <span className="profile-rep-name">Successful transactions</span>
                        </div>
                        <div className="profile-rep-item">
                            <span className="profile-rep-num">1.4%</span>
                            <span className="profile-rep-name">Cancellation rate</span>
                        </div>
                        <div className="profile-rep-item">
                            <span className="profile-rep-num">98%</span>
                            <span className="profile-rep-name">Response rate</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <Icon name="settings"/>
                    <h2>Account &amp; Preferences</h2>
                </div>
                <div className="profile-prefs">
                    <div className="profile-pref">
                        <Icon name="bell"/>
                        <span>Notifications</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="lock"/>
                        <span>Privacy</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="shield"/>
                        <span>Security</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="wallet"/>
                        <span>Payment methods</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="location"/>
                        <span>Saved locations</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="bookmark"/>
                        <span>Saved resources</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="language"/>
                        <span>Language</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref">
                        <Icon name="palette"/>
                        <span>Appearance</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                    <div className="profile-pref profile-pref-danger">
                        <Icon name="logout"/>
                        <span>Logout</span>
                        <Icon name="chevron" className="pref-chevron"/>
                    </div>
                </div>
            </div>

            <div className="profile-section profile-danger-zone">
                <div className="profile-section-head">
                    <Icon name="warning"/>
                    <h2>Danger Zone</h2>
                </div>
                <div className="profile-danger-actions">
                    <button className="profile-danger-btn">Deactivate account</button>
                    <button className="profile-danger-btn profile-danger-btn-red">Delete account</button>
                </div>
            </div>

        </div>
    )
}

export default Profile