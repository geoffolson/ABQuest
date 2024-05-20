import classNames from "classnames";

export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { variant?: "primary" | "secondary"; isLoading?: boolean }
) => {
  return (
    <button
      className={classNames(
        "border-gray-800 bg-gray-800 border-2 p-3 w-full",
        {
          "bg-gray-600 text-gray-500": props.disabled || props.isLoading,
        },
        { "bg-transparent text-gray-800": props.variant === "secondary" }
      )}
      {...props}
    />
  );
};
