import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post(props) {
  const { user } = useContext(UserContext);

  const [post, setPost] = useState({
    title: props.entry.title,
    text: props.entry.text,
  });

  const token = user.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const deletePost = () => {
    axios
      .delete(`http://localhost:5000/api/posts/${props.entry._id}`, config)
      .then((res) => {
        if (res.data.id) {
          toast("Dream deleted", {
            hideProgressBar: true,
            position: "bottom-center",
          });
          setPost({
            title: "",
            text: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {post.title && (
        <div className="text-center p-10 border-b-2 my-12 w-11/12 content-center mx-auto">
          <div>
            <h1 className="text-cyan-900 mb-5 text-xl underline">
              {post.title}
            </h1>
            <div className="flex flex-row justify-center">
              <p className="text-xs">
                <Link to="/edit" state={props.entry}>
                  Edit
                </Link>
              </p>
              <p className="text-xs"> | </p>
              <p className="text-xs" onClick={deletePost}>
                <Link to="/">Delete</Link>
              </p>
            </div>
          </div>

          <p className="my-32">{post.text}</p>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
