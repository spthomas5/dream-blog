import axios from "axios";
import { useState, useContext} from "react";
import { UserContext } from "../../UserContext";

export default function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = e => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    const {user, setUser} = useContext(UserContext);

    const onSubmit = e => {
        e.preventDefault();
        const API_URL = "/api/users/";

        const params = new URLSearchParams();
        params.append('name', formData.username);
        params.append('email', formData.email);
        params.append('password', formData.password);
        axios.post('http://localhost:5000/api/users', params)
        .then(res => {
            console.log(res.data)
            setUser(res.data.token);
        
        })
        .catch(e => console.log(e));

        console.log("SUBMITTED");
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
            <input type="text" name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
            <input type="text" name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
            <button>button</button>
            <div>{user}</div>
            
        </form>
    )
}