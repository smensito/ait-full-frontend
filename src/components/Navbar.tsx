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
    <header className="w-full py-10 px-48 bg-green-700 flex justify-between">
      <nav className="text-3xl text-green-50 font-bold">
        <Link to="/">
          <h1 className="">CR Mahoh</h1>
        </Link>
      </nav>

      {loggedIn ? (
        <div>
          <button
            className="bg-green-50 hover:bg-green-200 text-green-700 font-bold py-2 px-4 border border-green-700 rounded"
            onClick={signOut}
          >
            {" "}
            Logout
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
};

export default Navbar;
