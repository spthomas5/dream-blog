import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  const [post, setPost] = useState({
    title: "",
    dream: "",
  });

  const handleChange = (e) => {
    setPost((prevPost) => ({
      ...prevPost,
      [e.target.id]: e.target.value,
    }));
  };

  const token = user.token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let dreams = 4;

  const navigate = useNavigate();
  axios
    .get("http://localhost:5000/api/posts/", config)
    .then((res) => {
      if (JSON.stringify(res.data) !== JSON.stringify(posts)) {
        setPosts(res.data);
      }
    })
    .catch((err) => console.log(err));

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("title", post.title);
    params.append("text", post.dream);
    axios
      .post("http://localhost:5000/api/posts/", params, config)
      .then((res) => {
        if (res.data._id) {
          setPosts((prevPosts) => {
            return prevPosts.concat(res.data);
          });
          navigate("/");
        }
      })
      .catch((e) => console.log(e));

    setPost({
      title: "",
      dream: "",
    });
  };

  return (
    <div>
      {user.token ? (
        posts.map((post) => <Post entry={post} />)
      ) : (
        <div className="mx-auto">
          <p className="p-4 mr-4">Register or login to see your posts!</p>
        </div>
      )}
      {user.token && (
        <form onSubmit={onSubmit} className="mt-10 mx-10">
          {user.isError == true && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="font-medium">Danger alert!</span> Change a few
              things up and try submitting again.
            </div>
          )}
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
              id="dream"
              cols="100"
              rows="10"
              placeholder="Dream"
              value={post.dream}
              onChange={handleChange}
              className="p-2 border border-black mb-5"
            ></textarea>
            <button className="bg-slate-400 rounded p-3 mx-4 h-11 my-auto">
              Submit
            </button>
          </div>

          <div>{user.id}</div>
        </form>
      )}
      {user.isError && (
        <div
          class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span class="font-medium">Done!</span> You have successfully edited
          your dream
        </div>
      )}
    </div>
  );
}
