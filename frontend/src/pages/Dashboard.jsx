import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";
import Post from "../components/Post";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  const token = user.token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  let dreams = 4;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts/", config)
      .then((res) => {
        if (res.data) {
          console.log("resdata" + JSON.stringify(res.data));
          setPosts(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {user.token ? (
        posts.map((post) => <Post entry={post} />)
      ) : (
        <div className="mx-auto">
          <p className="p-4 mr-4">Register or login to see your posts!</p>
        </div>
      )}
    </div>
  );
}
