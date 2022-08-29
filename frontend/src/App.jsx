import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Edit from "./pages/Edit";
import { UserContext } from "../UserContext";

function App() {
  const [user, setUser] = useState({
    token: null,
    isError: false,
    isSuccess: true,
    message: "",
  });

  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/edit" element={<Edit />}></Route>
          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
