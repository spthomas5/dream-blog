import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const logout = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      token: null,
    }));
    console.log(user);
  };

  return (
    <nav className="flex flex-row w-full justify-between bg-slate-50 drop-shadow-xl">
      <h1 className="p-4 mx-auto">
        <Link to="/">Dream Blog</Link>
      </h1>
      {!user.token ? (
        <ul className="flex flex-row">
          <li className="p-4">
            <Link to="/login">Login</Link>
          </li>
          <li className="p-4">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row">
          <li className="p-4" onClick={logout}>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
