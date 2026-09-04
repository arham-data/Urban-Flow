import { useState } from "react" 
import { Link } from "react-router-dom"

function Login(){

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

    function HandleSubmit(event){
        event.preventDefault()
        console.log(FormData)
        setFormData({
            username: "",
            password:""
        })
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
                    <input name="username" value={formData.username} onChange={HandleChange} placeholder="Username"></input>
                    <p>Password</p>
                    <input name="password" value={formData.password} onChange={HandleChange} placeholder="Password"></input>
                    
                </form>

                <div className="form-bottom">
                    <button onClick={HandleSubmit}>Submit</button>
                    <p>Don't have an account <Link to="/singup"><span>Sign Up!</span></Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login