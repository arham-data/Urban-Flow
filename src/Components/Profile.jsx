function Profile(){
    return(
        <div className="profile-page">

            <div className="profile-hero">
                <div className="profile-avatar">
                    <ion-icon name="person-circle"></ion-icon>
                </div>
                <div className="profile-id">
                    <div className="profile-name-row">
                        <h1>Arham Jain</h1>
                        <span className="profile-verified">
                            <ion-icon name="checkmark-circle"></ion-icon>
                            Verified
                        </span>
                    </div>
                    <span className="profile-username">@arhamjain</span>
                    <span className="profile-type">Business Account · Verified</span>
                    <div className="profile-meta">
                        <span>
                            <ion-icon name="location-outline"></ion-icon>
                            Delhi, India
                        </span>
                        <span>
                            <ion-icon name="calendar-outline"></ion-icon>
                            Member since 2026
                        </span>
                    </div>
                </div>
                <button className="profile-edit">Edit Profile</button>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <ion-icon name="card-outline"></ion-icon>
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
                    <ion-icon name="business-outline"></ion-icon>
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
                            <ion-icon name="checkmark-circle" className="verified"></ion-icon>
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
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
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
                            <ion-icon name="checkmark-circle" className="verified"></ion-icon>
                        </div>
                        <div className="profile-verify-item">
                            <span>Email</span>
                            <ion-icon name="checkmark-circle" className="verified"></ion-icon>
                        </div>
                        <div className="profile-verify-item">
                            <span>Identity</span>
                            <ion-icon name="checkmark-circle" className="verified"></ion-icon>
                        </div>
                        <div className="profile-verify-item">
                            <span>Business</span>
                            <ion-icon name="checkmark-circle" className="verified"></ion-icon>
                        </div>
                        <div className="profile-verify-item">
                            <span>Address</span>
                            <ion-icon name="ellipse-outline"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <div className="profile-section-head">
                    <ion-icon name="pulse-outline"></ion-icon>
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
                    <ion-icon name="star-outline"></ion-icon>
                    <h2>Your UrbanFlow Reputation</h2>
                </div>
                <div className="profile-reputation">
                    <div className="profile-rep-main">
                        <ion-icon name="star"></ion-icon>
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
                    <ion-icon name="settings-outline"></ion-icon>
                    <h2>Account &amp; Preferences</h2>
                </div>
                <div className="profile-prefs">
                    <div className="profile-pref">
                        <ion-icon name="notifications-outline"></ion-icon>
                        <span>Notifications</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="profile-pref">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <span>Privacy</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="profile-pref">
                        <ion-icon name="shield-outline"></ion-icon>
                        <span>Security</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="profile-pref">
                        <ion-icon name="wallet-outline"></ion-icon>
                        <span>Payment methods</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="profile-pref">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>Saved locations</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="profile-pref">
                        <ion-icon name="bookmark-outline"></ion-icon>
                        <span>Saved resources</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="profile-pref">
                        <ion-icon name="language-outline"></ion-icon>
                        <span>Language</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="profile-pref">
                        <ion-icon name="color-palette-outline"></ion-icon>
                        <span>Appearance</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="profile-pref profile-pref-danger">
                        <ion-icon name="log-out-outline"></ion-icon>
                        <span>Logout</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                </div>
            </div>

            <div className="profile-section profile-danger-zone">
                <div className="profile-section-head">
                    <ion-icon name="warning-outline"></ion-icon>
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