import React  from "react";
import "./button.css";

function Button({ display, value, onClick, classes = [] }) {
  const classNames = ["button", ...classes.map((cls) => cls)];

  return (
    <button
      onClick={() => onClick?.({ display, value })}
      className={classNames.join(" ")}
    >
      <span>{display}</span>
    </button>
  );
}

export default Button;