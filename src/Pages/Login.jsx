import { useState } from "react" 
import { Link, useNavigate } from "react-router-dom"

function Login(){

    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        username:"",
        password:""
    })

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
            console.log("login api is working")
        } else {
            console.log(result.message)
        }

        setFormData({
            username:"",
            password:""
        })

        navigate("/dashboard")
    }


    return(
        <main className="login-page">
            <div className="login-l">
                <div className="l-logo">URBAN FLOW</div>

                <div className="l-text">
                    <p>Move the <br></br> city forward.</p>
                    <span>A living network for the people, places, and resources that keep cities moving.</span>
                </div>
            </div>


            <div className="login-r">
                <div className="form-head">
                    <p>Create your UrbanFlow account</p>
                 </div>
                <form onSubmit={HandleSubmit}>
                    <p>Username</p>
                    <input name="username" value={formData.username} onChange={HandleChange} placeholder="Username" required></input>
                    <p>Password</p>
                    <input name="password" value={formData.password} onChange={HandleChange} placeholder="Password" required></input>
                    
                </form>

                <div className="form-bottom">
                    <button onClick={HandleSubmit}>Submit</button>
                    <p>Don't have an account <Link to="/signup"><span>Sign Up!</span></Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login