import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const API_URL = "/api/users/login";

    const params = new URLSearchParams();
    params.append("email", formData.email);
    params.append("password", formData.password);
    axios
      .post("http://localhost:5000/api/users/login", params)
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          setUser((prevUser) => ({
            ...prevUser,
            token: res.data.token,
          }));
          navigate("/");
        }
      })
      .catch((e) => console.log(e));

    console.log("SUBMITTED");
  };

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button className="bg-slate-400 rounded p-3">Submit</button>
    </form>
  );
}
