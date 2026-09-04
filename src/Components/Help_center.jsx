function HelpCenter(){
    return(
        <div className="help-page">

            <div className="help-hero">
                <div className="help-search">
                    <ion-icon name="search-outline"></ion-icon>
                    <input placeholder="How can we help you today?"></input>
                </div>
                <h1>Help Center</h1>
                <p>Guides, answers and support for the UrbanFlow network.</p>
            </div>

            <div className="help-grid">
                <div className="help-card">
                    <div className="help-card-head">
                        <ion-icon name="compass-outline"></ion-icon>
                        <h2>Getting Started</h2>
                    </div>
                    <ul className="help-links">
                        <li>Setting up your account</li>
                        <li>Listing your first resource</li>
                        <li>Understanding Trust &amp; Verification</li>
                        <li>Making your first request</li>
                    </ul>
                </div>

                <div className="help-card">
                    <div className="help-card-head">
                        <ion-icon name="car-sport-outline"></ion-icon>
                        <h2>Using Resources</h2>
                    </div>
                    <ul className="help-links">
                        <li>Renting trucks &amp; vehicles</li>
                        <li>Booking warehouse &amp; storage</li>
                        <li>Purchasing inventory</li>
                        <li>Tracking active operations</li>
                    </ul>
                </div>

                <div className="help-card">
                    <div className="help-card-head">
                        <ion-icon name="card-outline"></ion-icon>
                        <h2>Billing &amp; Payments</h2>
                    </div>
                    <ul className="help-links">
                        <li>Adding payment methods</li>
                        <li>Understanding pricing units</li>
                        <li>Requesting refunds</li>
                        <li>Downloading invoices</li>
                    </ul>
                </div>

                <div className="help-card">
                    <div className="help-card-head">
                        <ion-icon name="shield-checkmark-outline"></ion-icon>
                        <h2>Trust &amp; Safety</h2>
                    </div>
                    <ul className="help-links">
                        <li>How verification works</li>
                        <li>Reporting a user</li>
                        <li>Dispute resolution</li>
                        <li>Safe transaction guidelines</li>
                    </ul>
                </div>
            </div>

            <div className="help-contact">
                <div className="help-contact-head">
                    <ion-icon name="headset-outline"></ion-icon>
                    <h2>Still need help?</h2>
                </div>
                <div className="help-contact-actions">
                    <button className="help-contact-btn">
                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                        Live Chat
                    </button>
                    <button className="help-contact-btn">
                        <ion-icon name="mail-outline"></ion-icon>
                        Email Support
                    </button>
                    <button className="help-contact-btn">
                        <ion-icon name="call-outline"></ion-icon>
                        Call Us
                    </button>
                </div>
            </div>

            <div className="help-faq">
                <div className="set-section-head">
                    <ion-icon name="help-circle-outline"></ion-icon>
                    <h2>Frequently Asked Questions</h2>
                </div>
                <div className="help-faq-item">
                    <h3>How do I get verified on UrbanFlow?</h3>
                    <p>Complete your phone, email and identity verification from your Profile's Trust &amp; Verification section.</p>
                </div>
                <div className="help-faq-item">
                    <h3>How is pricing calculated?</h3>
                    <p>Providers set pricing per unit — daily, per sq ft per month or per unit. The listing always shows the unit clearly.</p>
                </div>
                <div className="help-faq-item">
                    <h3>Can I cancel a request?</h3>
                    <p>Yes. Outgoing requests can be cancelled before acceptance. After acceptance, contact support for assistance.</p>
                </div>
            </div>

        </div>
    )
}

export default HelpCenter
