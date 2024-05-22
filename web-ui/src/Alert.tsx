import React from "react";

export const Alert = (props: { children: React.ReactNode; hidden?: boolean }) => {
  return (
    <div
      role="alert"
      hidden={!!props.hidden}
      className="rounded border-s-4 border-red-500 bg-red-50 p-4"
    >
      <strong className="block font-medium text-red-800"> Something went wrong </strong>
      <p className="mt-2 text-sm text-red-700">{props.children}</p>
    </div>
  );
};
