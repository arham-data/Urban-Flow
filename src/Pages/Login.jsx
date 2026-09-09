import { useState } from "react" 
import { Link, useNavigate } from "react-router-dom"

function Login(){

    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        username:"",
        password:""
    })

    const [error, setError] = useState("")

    function HandleChange(event){
        const {name,value} = event.target

        setFormData(prev =>({
            ...prev,
            [name]:value
        }))
    }

    async function HandleSubmit(event){
        event.preventDefault()

        const response = await fetch(
            "https://backend-production-4068.up.railway.app/api/login",
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
        } else {
            setError(result.message)
        }

        setFormData({
            username:"",
            password:""
        })
    }


    return(
        <main className="login-page">
            <div className="login-l">
                <div className="l-brand">UrbanFlow</div>

                <div className="l-ticker">
                    <span className="l-ticker-dot"></span>
                    <span>Network live · Delhi NCR</span>
                </div>

                <div className="l-text">
                    <p>Move the <em>city</em> forward.</p>
                    <span>A living network for the people, places, and resources that keep cities moving.</span>
                </div>

                <div className="l-footer">
                    <span>Transport</span>
                    <span className="l-dot">·</span>
                    <span>Storage</span>
                    <span className="l-dot">·</span>
                    <span>Space</span>
                </div>
            </div>


            <div className="login-r">
                <div className="auth-card">
                    <div className="auth-eyebrow">Member access</div>
                    <h1 className="auth-title">Welcome back.</h1>
                    <p className="auth-sub">Sign in to your UrbanFlow account to reach your resource network.</p>

                    <form onSubmit={HandleSubmit}>
                        <label>Username</label>
                        <input name="username" value={formData.username} onChange={HandleChange} placeholder="e.g. arhamjain" required></input>
                        <label>Password</label>
                        <input name="password" value={formData.password} onChange={HandleChange} placeholder="••••••••••" type="password" required></input>
                    </form>

                    <div className="form-bottom">
                        <button onClick={HandleSubmit}>Sign In</button>
                        <p>Don't have an account? <Link to="/signup"><span>Create one</span></Link></p>
                    </div>
                </div>
            </div>

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
                        <h3>Login Failed</h3>
                        <p>{error}</p>
                        <button onClick={() => setError("")}>Close</button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Login