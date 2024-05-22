import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { cancelRegistration, saveToken, saveUser } from "../redux/gameSlice";
import { APIError, userAPI } from "../api";
import { Alert } from "../Alert";

export const Register = (props: { login?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<{ username: string; password: string }>();

  const onSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    if (props.login) {
      userAPI
        .login(data)
        .catch((e: APIError) => setError(e.message))
        .then((results) => {
          if (results?.token) {
            dispatch(saveToken(results.token));
            return userAPI
              .getProfile()
              .then((user) => dispatch(saveUser(user)))
              .catch((e: APIError) => setError(e.message));
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      userAPI
        .register(data)
        .then(() => dispatch(cancelRegistration()))
        .catch((e: APIError) => setError(e.message))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div>
      <div className="text-lg pb-3">{props.login ? "Log In" : "Sign Up"}</div>
      <div className="pb-3">
        <Alert hidden={!error}>{error}</Alert>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="flex w-full flex-col">
          Username:
          <input
            className="text-black p-1"
            {...register("username", { required: true })}
            type="string"
          />
        </label>
        <label className="flex w-full flex-col">
          Password:
          <input
            className="text-black p-1"
            {...register("password", { required: true })}
            type="password"
          />
        </label>
        <div className="flex gap-4">
          <Button variant="secondary" type="button" onClick={() => dispatch(cancelRegistration())}>
            Back
          </Button>
          <Button disabled={isLoading}>Submit</Button>
        </div>
      </form>
    </div>
  );
};
