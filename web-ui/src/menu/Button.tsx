export const Button = (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  return (
    <button
      className={`bg-gray-800 ${props.disabled ? "bg-gray-600 text-gray-800" : ""} p-5 w-full`}
      {...props}
    />
  );
};
