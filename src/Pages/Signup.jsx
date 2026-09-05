import { useState } from "react" 
import { Link } from "react-router-dom"

function SignUp(){

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        number:"",
        confirmPassword:""
    })

    async function HandleSubmit(event){
        event.preventDefault()

        const response = await fetch(
            "https://backend-production-5a55.up.railway.app/api/signup",
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
            console.log("signup api is working")
        }else{
            console.log(result.message)
        }
    }


    function HandleChange(event){
        const {name,value} = event.target

        setFormData(prev => ({
            ...prev,
            [name]:value
        }))
    }


    return(
        <> 
        <main className="login-page">

            <div className="login-l">
                <div className="l-logo"><Link to="/">URBAN FLOW</Link></div>
                

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
                    <p>Name</p>
                    <input name="name" value={formData.name} onChange={HandleChange} placeholder="Name"></input>
                    <p>Username</p>
                    <input name="username" value={formData.username} onChange={HandleChange} placeholder="Username"></input>
                    <p>E-mail</p>
                    <input name="email" value={formData.email} onChange={HandleChange} placeholder="E-mail"></input>
                    <p>Password</p>
                    <input name="password" value={formData.password} onChange={HandleChange} placeholder="Password"></input>
                    <p>Phone Number</p>
                    <input name="number" value={formData.number} onChange={HandleChange} placeholder="Phone Number"></input>
                    <p>Confirm Password</p>
                    <input name="confirmPassword" value={formData.confirmPassword} onChange={HandleChange} placeholder="Confirm Password"></input>
                </form>

                <div className="form-bottom">
                    <button onClick={HandleSubmit}>Submit</button>
                    <p>Already have an account <Link to="/login"><span>Login</span></Link> </p>
                </div>
            </div>
        </main>
        </>
    )
}

export default SignUp