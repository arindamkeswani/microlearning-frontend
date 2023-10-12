import { useMutation } from "react-query";
import { login } from "./login-fetcher";

export const useLogin = () => {
  const {
    data,
    isLoading,
    mutate: loginFetcher,
  } = useMutation(["login"], login);
  return {
    loginFetcher,
    data,
    isLoading,
  };
};
