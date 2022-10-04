import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

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

      <div className="logout">
        <button onClick={signOut}> Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
