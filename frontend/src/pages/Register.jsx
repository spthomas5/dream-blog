import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
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

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const API_URL = "/api/users/";

    const params = new URLSearchParams();
    params.append("name", formData.username);
    params.append("email", formData.email);
    params.append("password", formData.password);
    axios
      .post("http://localhost:5000/api/users/", params)
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

  return (
    <form onSubmit={onSubmit} className="mt-10 mx-10">
      {user.isError == true && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Danger alert!</span> Change a few things
          up and try submitting again.
        </div>
      )}
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
        name="username"
        placeholder="Username"
        value={formData.username}
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
      <button className="bg-slate-400 rounded p-3 mx-4">Submit</button>
      <div>{user.id}</div>
    </form>
  );
}
