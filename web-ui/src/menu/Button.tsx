import classNames from "classnames";

export const Button = ({
  isLoading,
  variant,
  ...props
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}) => {
  return (
    <button
      className={classNames(
        "border-gray-800 bg-gray-800 border-2 p-3 w-full",
        {
          "bg-gray-600 text-gray-500": props.disabled || isLoading,
        },
        { "bg-transparent": variant === "secondary" }
      )}
      {...props}
    />
  );
};
