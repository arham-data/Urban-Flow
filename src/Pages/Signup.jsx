import { useState } from "react" 
import { Link, useNavigate } from "react-router-dom"

function SignUp(){

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name:"",
        username:"",        
        number:"",
        email:"",
        password:""
    })

    const [error, setError] = useState("")

    async function HandleSubmit(event){
        event.preventDefault()

        if (formData.number.length !== 10) {
            setError("Phone number must be exactly 10 digits")
            return
        }

        const response = await fetch(
            "https://backend-production-4068.up.railway.app/api/signup",
            {
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(formData)
            }
        )

        const result = await response.json()

        if (response.ok){
            localStorage.setItem("user", JSON.stringify(result.user))
            navigate("/dashboard")
        }else{
            setError(result.message)
        }

        setFormData({
            name:"",
            username:"",
            number:"",
            email:"",
            password:""
        })
    }


    function HandleChange(event){
        const {name,value} = event.target

        if (name === "number") {
            const digitsOnly = value.replace(/\D/g, "").slice(0, 10)
            setFormData(prev => ({
                ...prev,
                [name]: digitsOnly
            }))
            return
        }

        setFormData(prev => ({
            ...prev,
            [name]:value
        }))
    }


    return(
        <> 
        <main className="login-page">

            <div className="login-l">
                <div className="l-brand"><Link to="/">UrbanFlow</Link></div>

                <div className="l-ticker">
                    <span className="l-ticker-dot"></span>
                    <span>Network live · Delhi NCR</span>
                </div>

                <div className="l-text">
                    <p>Move the <em>city</em> forward.</p>
                    <span>A living network for the people, places, and resources that keep cities moving.</span>
                </div>

                <div className="l-footer">
                    <span>1 · Join</span>
                    <span className="l-dot">·</span>
                    <span>2 · List</span>
                    <span className="l-dot">·</span>
                    <span>3 · Move</span>
                </div>
            </div>


            <div className="login-r">
                <div className="auth-card">
                    <div className="auth-eyebrow">Join the network</div>
                    <h1 className="auth-title">Create your account.</h1>
                    <p className="auth-sub">List resources, find what you need, and move your city forward.</p>

                    <form onSubmit={HandleSubmit}>
                        <label>Full name</label>
                        <input name="name" value={formData.name} onChange={HandleChange} placeholder="e.g. Arham Jain" required></input>
                        <label>Username</label>
                        <input name="username" value={formData.username} onChange={HandleChange} placeholder="e.g. arhamjain" required></input>
                        <label>Phone number</label>
                        <div className="phone-input-wrap">
                            <span className="phone-prefix">+91</span>
                            <input name="number" value={formData.number} onChange={HandleChange} placeholder="98765 43210" type="tel" required></input>
                        </div>
                        <label>Email</label>
                        <input name="email" value={formData.email} onChange={HandleChange} placeholder="you@example.com" required></input>
                        <label>Password</label>
                        <input name="password" value={formData.password} onChange={HandleChange} placeholder="Create a strong password" type="password" required></input>
                    </form>

                    <div className="form-bottom">
                        <button onClick={HandleSubmit}>Create Account</button>
                        <p>Already have an account? <Link to="/login"><span>Sign in</span></Link></p>
                    </div>
                </div>
            </div>
        </main>

        {error && (
            <div className="error-popup-overlay" onClick={() => setError("")}>
                <div className="error-popup" onClick={(e) => e.stopPropagation()}>
                    <div className="error-popup-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                    </div>
                    <h3>Signup Failed</h3>
                    <p>{error}</p>
                    <button onClick={() => setError("")}>Close</button>
                </div>
            </div>
        )}
        </>
    )
}

export default SignUp