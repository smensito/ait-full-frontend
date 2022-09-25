import { useRef, useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/useLogin";
import IAccessToken from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { refetch, isFetching, isError } = useLogin({
    username: user,
    password: pwd,
  });

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  interface IAuth {
    user: IUser;
    accessToken: IAccessToken;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    refetch()
      .then((res) => {
        const accessToken: IAccessToken = res.data?.tokens?.access;
        const user: IUser = res.data?.user;

        const authState: IAuth = { user: user, accessToken: accessToken };
        setAuth(authState);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err?.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err?.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }

        errRef.current?.focus();
      });
  };

  if (isError) return <h2> Error ...</h2>;

  if (isFetching) return <h2> Loading ...</h2>;

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-label="assertive"
      >
        {" "}
        {errMsg}
      </p>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </fieldset>

        <button>Sign In</button>
      </form>

      <p>
        Need an Account? <br />
        <a href="/register">Sign Up</a>
      </p>
    </section>
  );
};

export default Login;
