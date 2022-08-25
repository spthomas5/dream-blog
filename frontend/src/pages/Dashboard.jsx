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
        <h1>Register or login to see your posts!</h1>
      )}
    </div>
  );
}
