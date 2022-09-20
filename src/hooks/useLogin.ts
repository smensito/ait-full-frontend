import { useQuery } from "react-query";

interface LoginProps {
  username: string;
  password: string;
}

const loginUser = async (props: LoginProps) => {
  const jsonBody = JSON.stringify(props);

  // For this training loop get players
  const trainingResponse = await fetch(`http://localhost:3001/v1/auth/login/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: jsonBody,
  });
  return await trainingResponse.json();
};

const useLogin = (props: LoginProps) => {
  const { username, password } = props;

  return useQuery(
    ["login", username, password],
    () => loginUser({ username, password }),
    {
      enabled: false,
    }
  );
};

export default useLogin;
