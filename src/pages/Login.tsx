import { useRef, useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/useLogin";
import IAccessToken from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";
import { useTranslation } from "react-i18next";

interface IFrom {
  pathname: string;
}

interface ILocationState {
  state: { from: IFrom };
}

const Login = () => {
  const { setAuth } = useAuth();
  const { t } = useTranslation()

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = (location.state as ILocationState) || "/";
  const pathname = state?.from?.pathname || "/";

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
        navigate(pathname, { replace: true });
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

  if (isError) return <h2> {t('common.error')}</h2>;

  if (isFetching) return <h2> {t('common.loading')}</h2>;

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
      <h1>{t('login.signIn')}</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="username">{t('login.username')}:</label>
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
          <label htmlFor="password">{t('login.password')}:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </fieldset>

        <button>{t('login.signIn')}</button>
      </form>

      <p>
        {t('login.needAccount')} <br />
        <a href="/register">{t('login.signUp')}</a>
      </p>
    </section>
  );
};

export default Login;
