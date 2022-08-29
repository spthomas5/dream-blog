import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        if (res.data.message) {
          toast(res.data.message, {
            hideProgressBar: true,
            position: "bottom-center",
          });
        }
        if (res.data.token) {
          setUser((prevUser) => ({
            ...prevUser,
            token: res.data.token,
          }));
          toast("Welcome back!", {
            hideProgressBar: true,
            position: "bottom-center",
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((e) =>
        toast(e.response.data.message, {
          hideProgressBar: true,
          position: "bottom-center",
        })
      );
  };

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit} className="mt-10 mx-10">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="mx-4 p-2"
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="mx-4 p-2"
      />
      <button className="bg-slate-400 rounded p-3 mx-4 px-5">Submit</button>
      <ToastContainer />
    </form>
  );
}
