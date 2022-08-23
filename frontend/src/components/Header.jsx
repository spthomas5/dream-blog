import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../UserContext";

export default function Header() {

    const {user, setUser} = useContext(UserContext);

    return (
        <nav className="flex flex-row w-full justify-between bg-slate-50 drop-shadow-xl">
            <h1 className="p-4 mx-auto">
                <Link to='/'>
                    Dream Blog
                </Link>
            </h1>
            <ul className="flex flex-row">
                <li className="p-4">
                    <Link to='/login'> 
                        Login
                    </Link>
                </li>
                <li className="p-4">
                    <Link to='/register'> 
                        Register
                    </Link>
                </li>
            </ul>
        </nav>
    )
 }