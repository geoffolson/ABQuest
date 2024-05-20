import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { cancelRegistration, saveToken, saveUser } from "../redux/gameSlice";
import { userAPI } from "../api";

export const Register = (props: { login?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<{ username: string; password: string }>();

  const onSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    if (props.login) {
      const results = await userAPI.login(data);
      if (results.token) {
        dispatch(saveToken(results.token));
        const user = await userAPI.getProfile();
        dispatch(saveUser(user));
      }
    } else {
      await userAPI.register(data);
      dispatch(cancelRegistration());
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="text-lg pb-6">{props.login ? "Log In" : "Sign Up"}</div>
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
          <Button variant="secondary" onClick={() => dispatch(cancelRegistration())}>
            Back
          </Button>
          <Button disabled={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
