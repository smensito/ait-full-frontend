import { useRef, useState, useEffect, FormEvent, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useLogin from "../hooks/useLogin";
import IUser from "../interfaces/IUser";

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { refetch, isFetching, isError, data } = useLogin({
    username: user,
    password: pwd,
  });

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    refetch()
      .then((res) => {
        console.log(res.data);
        const accessToken: string = res.data?.tokens?.access;
        const user: IUser = res.data?.user;
        // TODO: Añadir roles!
        setAuth(user, accessToken);
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);

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
    <>
      {success ? (
        <section>
          <h1> You are logged in!</h1>
        </section>
      ) : (
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
      )}
    </>
  );
};

export default Login;
