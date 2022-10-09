import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLogged = auth.user.username?.length === 0 ? false : true;
    setLoggedIn(isLogged);
  }, [auth]);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header>
      <nav className="container">
        <Link to="/">
          <h1 className="logo">CR Mahoh</h1>
        </Link>
      </nav>

      {loggedIn ? (
        <div className="logout">
          <button onClick={signOut}> Logout</button>
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
};

export default Navbar;
