export const Button = (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  return <button className="bg-gray-800 p-5 w-full" {...props} />;
};
