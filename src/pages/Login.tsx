import { useRef, useState, useEffect, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import useLogin from "../hooks/useLogin";
import useToggle from "../hooks/useToggle";
import { IAccessToken, IAuth, IRefreshToken } from "../interfaces/ITokens";
import IUser from "../interfaces/IUser";
import { useTranslation } from "react-i18next";

interface IFrom {
  pathname: string;
}

interface ILocationState {
  state: { from: IFrom };
}

const Login = () => {
  const { t } = useTranslation()
  const { setAuth, prevAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = (location.state as ILocationState) || "/";
  const pathname = state?.from?.pathname || "/training";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    refetch()
      .then((res) => {
        const user: IUser = res.data?.user!;
        const refreshToken: IRefreshToken = res.data?.tokens.refresh!;
        const accessToken: IAccessToken = res.data?.tokens.access!;

        const authState: IAuth = {
          user: user,
          tokens: { access: accessToken, refresh: refreshToken },
        };

        setAuth(authState);
        resetUser();
        setPwd("");

        prevAuth.user = user;
        prevAuth.tokens.access = accessToken;
        prevAuth.tokens.refresh = refreshToken;
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
    <section className="w-auto  p-10 bg-gradient-to-b from-green-800 via-emerald-600 to-green-500  rounded">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-label="assertive"
      >
        {" "}
        {errMsg}
      </p>
      <h1 className="text-3xl pb-4 text-green-50 font-medium">{t('login.signIn')}</h1>
      <form onSubmit={handleSubmit} className="py-10">
        <fieldset className="flex justify-between py-2">
          <label htmlFor="username" className="text-green-50 font-medium">
            {t('login.username')}:
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            {...userAttribs}
            required
            className="ml-2 pl-2 text-green-800 rounded w-full"
          />
        </fieldset>

        <fieldset className="flex justify-between  py-2">
          <label htmlFor="password" className="text-green-50 font-medium">
            {t('login.password')}:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            className="ml-2 pl-2 text-green-800 rounded w-full"
          />
        </fieldset>

        <div className="py-4">
          <input
            type="checkbox"
            id="persist"
            onChange={toggleCheck}
            checked={check}
            className=" w-4 h-4 accent-green-500 cursor-pointer border-2 rounded-md focus:ring-0"
          />
          <label htmlFor="persist" className="ml-2 text-green-50 font-medium">
            Trust This Device
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
        >
          {t('login.signIn')}
        </button>
      </form>

      <p className="text-green-50 font-medium">
        {t('login.needAccount')} <br />
        <a
          href="/register"
          className="text-green-50 hover:text-green-300 hover:text-base background-transparent font-bold uppercase  py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          {t('login.signUp')}
        </a>
      </p>
    </section>
  );
};

export default Login;
