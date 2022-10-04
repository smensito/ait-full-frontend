import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    const isEmptyAccessToken = auth?.tokens.access.token.trim().length === 0;
    isEmptyAccessToken && persist ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`is loading: ${isLoading}`);
    console.log(`at: ${JSON.stringify(auth?.tokens.access)}`);
  }, [isLoading, auth?.tokens.access]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading ...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
