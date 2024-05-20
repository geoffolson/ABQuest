export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { variant?: "primary" | "secondary" }
) => {
  if (props.variant === "secondary") {
  }
  return (
    <button
      className={`border-gray-800 bg-gray-800 border-2 ${
        props.disabled ? "bg-gray-600 text-gray-800" : ""
      } ${props.variant === "secondary" ? "bg-transparent text-gray-800" : ""} p-3 w-full`}
      {...props}
    />
  );
};
