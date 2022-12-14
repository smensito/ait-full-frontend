import { useRef, useState, useEffect, FormEvent } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useRegister from "../hooks/useRegister";
import { useTranslation } from "react-i18next";


const USER_REGEX = new RegExp("^[a-z][A-z0-9-_]{3,24}$");
const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
const PWD_REGEX = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");

const Register = () => {
  const { t } = useTranslation()

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [selectedRole, setSelectedRole] = useState<string>("player");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { refetch, isFetching, isError, error } = useRegister({
    username: user,
    email: email,
    password: pwd,
    role: selectedRole,
  });

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedRole(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    // TODO: Comprobar que estamos accediendo al then del refetch y que se muestran los mensajes de error en caso de error
    refetch()
      .then(() => {
        if (isError) {
          setErrMsg("Error response: " + error);
          errRef.current?.focus();
        } else {
          setSuccess(true);
        }
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response. " + err);
        } else if (err.response?.status === 409) {
          setErrMsg("Username Taken. " + err);
        } else {
          setErrMsg("Registration failed. " + err);
        }
        errRef.current?.focus();
      });
  };

  if (isError) return <h2>{t('common.error')}</h2>;

  if (isFetching) return <h2>{t('common.loading')}</h2>;

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="/login">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>{t('register.register')}</h1>

          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="username">
                {t('login.username')}:
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <em dangerouslySetInnerHTML={{ __html: t('register.usernameNote') }} />
              </p>
            </fieldset>

            <fieldset>
              <label htmlFor="email">
                {t('register.email')}:
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>

              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                {t('register.emailNote')}
              </p>
            </fieldset>

            <fieldset>
              <label htmlFor="password">
                {t('login.password')}:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </label>

              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <em dangerouslySetInnerHTML={{ __html: t('register.passwordNote') }} />
              </p>
            </fieldset>

            <fieldset>
              <label htmlFor="confirm_pwd">
                {t('register.confirmPassword')}:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>

              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                {t('register.mustMatch')}
              </p>
            </fieldset>

            <div>
              <select onChange={selectChange}>
                <option selected disabled>
                  {t('register.dropdownDefaultValue')}
                </option>
                <option value="player">{t('common.roles.player')}</option>
                <option value="assistant">{t('common.roles.staff')}</option>
                <option value="coach">{t('common.roles.coach')}</option>
              </select>
            </div>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              {t('login.signUp')}
            </button>
          </form>

          <p>
            {t('register.registered')}
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="/login">{t('login.signIn')}</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
