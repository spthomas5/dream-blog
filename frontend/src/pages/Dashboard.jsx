import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../UserContext";

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
          setPosts(res.data.map((obj) => <h1>{obj.text}</h1>));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {user.token ? (
        <div>{posts}</div>
      ) : (
        <div className="mx-auto">
          <p className="p-4 mr-4">Register or login to see your posts!</p>
        </div>
      )}
    </div>
  );
}
