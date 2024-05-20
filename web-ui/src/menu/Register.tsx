import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { cancelRegistration } from "../redux/gameSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <div>
      <div className="text-lg pb-6">Registration</div>
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
