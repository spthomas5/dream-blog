import { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

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
    console.log("DEELTELTLED");
    axios
      .delete(`http://localhost:5000/api/posts/${props.entry._id}`, config)
      .then((res) => {
        if (res.data.id) {
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
        <div className="text-center p-10 border-b-2 my-12">
          <div>
            <h1 className="text-cyan-900 mb-5 text-xl underline">
              {post.title}
            </h1>
            <p onClick={deletePost}>
              <Link to="/">Delete</Link>
            </p>
            <p>
              <Link to="/edit" state={props.entry}>
                Edit
              </Link>
            </p>
          </div>

          <p className="my-32">{post.text}</p>
        </div>
      )}
    </>
  );
}
