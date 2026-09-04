function Settings(){
    return(
        <div className="set-page">

            <div className="set-title">
                <h1>Settings</h1>
                <p>Manage your account, notifications, security and preferences.</p>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <ion-icon name="person-outline"></ion-icon>
                    <h2>Profile</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <ion-icon name="create-outline"></ion-icon>
                        <span>Edit personal information</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="business-outline"></ion-icon>
                        <span>Business details &amp; verification</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="image-outline"></ion-icon>
                        <span>Profile photo</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <ion-icon name="notifications-outline"></ion-icon>
                    <h2>Notifications</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <ion-icon name="swap-horizontal-outline"></ion-icon>
                        <span>Request updates</span>
                        <span className="set-toggle on"></span>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="pulse-outline"></ion-icon>
                        <span>Operation alerts</span>
                        <span className="set-toggle on"></span>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="mail-outline"></ion-icon>
                        <span>Email notifications</span>
                        <span className="set-toggle"></span>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="megaphone-outline"></ion-icon>
                        <span>Marketing &amp; promotions</span>
                        <span className="set-toggle"></span>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                    <h2>Privacy &amp; Security</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <span>Change password</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="finger-print-outline"></ion-icon>
                        <span>Two-factor authentication</span>
                        <span className="set-toggle on"></span>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="eye-off-outline"></ion-icon>
                        <span>Privacy settings</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="shield-outline"></ion-icon>
                        <span>Verified devices</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <ion-icon name="wallet-outline"></ion-icon>
                    <h2>Payments</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <ion-icon name="card-outline"></ion-icon>
                        <span>Payment methods</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="cash-outline"></ion-icon>
                        <span>Payout preferences</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="receipt-outline"></ion-icon>
                        <span>Billing &amp; invoices</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <ion-icon name="location-outline"></ion-icon>
                    <h2>Saved</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <ion-icon name="location-outline"></ion-icon>
                        <span>Saved locations</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="bookmark-outline"></ion-icon>
                        <span>Saved resources</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                </div>
            </div>

            <div className="set-section">
                <div className="set-section-head">
                    <ion-icon name="options-outline"></ion-icon>
                    <h2>General</h2>
                </div>
                <div className="set-prefs">
                    <div className="set-pref">
                        <ion-icon name="language-outline"></ion-icon>
                        <span>Language</span>
                        <span className="set-value">English</span>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="color-palette-outline"></ion-icon>
                        <span>Appearance</span>
                        <span className="set-value">Light</span>
                    </div>
                    <div className="set-pref">
                        <ion-icon name="log-out-outline"></ion-icon>
                        <span>Logout</span>
                        <ion-icon name="chevron-forward-outline" className="pref-chevron"></ion-icon>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Settings
