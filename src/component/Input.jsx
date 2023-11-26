import React from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", classname = "", ...props },
  ref
) {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label>{label}</label>}
      <input type={type} className={`${classname}`} ref={ref} {...props} />
    </div>
  );
});

export default Input;
