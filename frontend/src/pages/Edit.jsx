import axios from "axios";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const location = useLocation();
  const [post, setPost] = useState({
    title: location.state.title,
    text: location.state.text,
  });

  const title = location.state.title;
  const text = location.state.text;

  const { user } = useContext(UserContext);
  const token = user.token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const navigate = useNavigate();
  console.log(config.headers);

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("title", post.title);
    params.append("text", post.text);

    axios
      .put(
        `http://localhost:5000/api/posts/${location.state._id}`,
        params,
        config
      )
      .then((res) => {
        toast("Dream updated!", {
          hideProgressBar: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    setPost((prevPost) => ({
      ...prevPost,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      {user.token ? (
        <form onSubmit={onSubmit} className="mt-10 mx-10">
          <div>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={post.title}
              onChange={handleChange}
              className="mb-5 p-2 border border-black"
            />
          </div>

          <div className="flex flex-row">
            <textarea
              name=""
              id="text"
              cols="100"
              rows="10"
              placeholder="Dream"
              value={post.text}
              onChange={handleChange}
              className="p-2 border border-black mb-5"
            ></textarea>
            <button className="bg-slate-400 rounded p-3 mx-4 h-11 my-auto">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="mx-auto">
          <p className="p-4 mr-4">Register or login to see your posts!</p>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
