import { useState } from "react"
import Icon from "./Icon.jsx"

const categories = [
    {
        icon: "compass",
        title: "Getting Started",
        links: ["Setting up your account", "Listing your first resource", "Understanding Trust & Verification", "Making your first request"]
    },
    {
        icon: "car",
        title: "Using Resources",
        links: ["Renting trucks & vehicles", "Booking warehouse & storage", "Purchasing inventory", "Tracking active operations"]
    },
    {
        icon: "card",
        title: "Billing & Payments",
        links: ["Adding payment methods", "Understanding pricing units", "Requesting refunds", "Downloading invoices"]
    },
    {
        icon: "shield",
        title: "Trust & Safety",
        links: ["How verification works", "Reporting a user", "Dispute resolution", "Safe transaction guidelines"]
    }
]

const faqs = [
    {
        question: "How do I get verified on UrbanFlow?",
        answer: "Complete your phone, email and identity verification from your Profile's Trust & Verification section."
    },
    {
        question: "How is pricing calculated?",
        answer: "Providers set pricing per unit — daily, per sq ft per month or per unit. The listing always shows the unit clearly."
    },
    {
        question: "Can I cancel a request?",
        answer: "Yes. Outgoing requests can be cancelled before acceptance. After acceptance, contact support for assistance."
    }
]

function HelpCenter(){
    const [query, setQuery] = useState("")

    const q = query.trim().toLowerCase()

    const matchCategories = q ? categories
        .map(c => ({...c, links: c.links.filter(l => (c.title + " " + l).toLowerCase().includes(q))}))
        .filter(c => c.links.length > 0)
        : categories

    const matchFaqs = q ? faqs.filter(f => (f.question + " " + f.answer).toLowerCase().includes(q)) : faqs

    return(
        <div className="help-page">

            <div className="help-hero">
                <h1>Help Center</h1>
                <p>Guides, answers and support for the UrbanFlow network.</p>
                <div className="help-search">
                    <Icon name="search"/>
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="How can we help you today?"></input>
                </div>
            </div>

            <div className="help-grid">
                {matchCategories.length === 0 ? (
                    <p style={{gridColumn:"1/-1",textAlign:"center",padding:"40px 0",fontSize:"14px",color:"var(--muted)"}}>No guides match "{query}".</p>
                ) : matchCategories.map((c) => (
                    <div className="help-card" key={c.title}>
                        <div className="help-card-head">
                            <Icon name={c.icon}/>
                            <h2>{c.title}</h2>
                        </div>
                        <ul className="help-links">
                            {c.links.map(l => <li key={l}>{l}</li>)}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="help-contact">
                <div className="help-contact-head">
                    <Icon name="headset"/>
                    <h2>Still need help?</h2>
                </div>
                <div className="help-contact-actions">
                    <button className="help-contact-btn">
                        <Icon name="chat"/>
                        Live Chat
                    </button>
                    <button className="help-contact-btn">
                        <Icon name="mail"/>
                        Email Support
                    </button>
                    <button className="help-contact-btn">
                        <Icon name="call"/>
                        Call Us
                    </button>
                </div>
            </div>

            <div className="help-faq">
                <div className="help-faq-head">
                    <Icon name="help"/>
                    <h2>Frequently Asked Questions</h2>
                </div>
                {matchFaqs.length === 0 ? (
                    <p style={{padding:"20px 0",fontSize:"14px",color:"var(--muted)"}}>No FAQ match "{query}".</p>
                ) : matchFaqs.map((f) => (
                    <div className="help-faq-item" key={f.question}>
                        <h3>{f.question}</h3>
                        <p>{f.answer}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default HelpCenter