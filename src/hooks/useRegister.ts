import { useQuery } from "react-query";

interface RegisterProps {
  username: string;
  email: string;
  password: string;
  role: string;
}

const registerUser = async (props: RegisterProps) => {
  const jsonBody = JSON.stringify(props);

  // For this training loop get players
  const trainingResponse = await fetch(
    `http://localhost:3001/v1/auth/register/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonBody,
    }
  );
  return await trainingResponse.json();
};

const useRegister = (props: RegisterProps) => {
  const { username, email, password, role } = props;

  return useQuery(
    ["register", username, email, password],
    () => registerUser({ username, email, password, role }),
    {
      enabled: false,
    }
  );
};

export default useRegister;
