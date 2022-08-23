import { useState, useContext} from "react"
import { UserContext } from "../../UserContext"

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = e =>{
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <form>
            <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
            <input type="text" name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
        </form>
        
    )
}