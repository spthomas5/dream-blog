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
  };

  return (
    <nav className="flex flex-row w-full justify-between bg-slate-50 drop-shadow-xl h-28">
      {!user.token ? (
        <ul className="flex flex-row my-auto">
          <li className="p-4 invisible">Login</li>
          <li className="p-4 invisible">Register</li>
        </ul>
      ) : (
        <ul className="flex flex-row my-auto">
          <li className="p-4 invisible">Logout</li>
        </ul>
      )}
      <h1 className="p-4 mx-auto text-4xl my-auto ">
        <Link to="/">Dream Log</Link>
      </h1>
      {!user.token ? (
        <ul className="flex flex-row my-auto">
          <li className="p-4">
            <Link to="/login" className="">
              Login
            </Link>
          </li>
          <li className="p-4">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row my-auto">
          <li className="p-4" onClick={logout}>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
