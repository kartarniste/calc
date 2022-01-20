import {  useLayoutEffect, useRef, useState } from "react";
import Button from "./component/Button";

import "./App.css"

const initialState = { value: "", display: "" };

export default function APP() {

  const [expression, setExpression] = useState(initialState);
  const [error, setError] = useState(null);
  const displayRef = useRef(null);


  const addExpression = ({ display, value }) => {
    setExpression((prev) => ({
      display: prev.display.concat(display),
      value: prev.value.concat(value),
    }));
  };


  const resetExpression = () => {
    setExpression(initialState);
  };


  const delExpression = () => {
    setExpression((prev) => ({
      display: prev.display.slice(0, -1),
      value: prev.value.slice(0, -1),
    }));
  };


  const submitInput = () => {
    setExpression((prev) => {
      try {
        setError(null);
        const submit = String(eval(prev.value) || "");

        return {
          value: submit,
          display: submit.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
      } catch {
        setError("Invalid");
        return prev;
      }
    });
  };
  const forceChange = (e) => {
    const value = e.target.value.replace(/\n/g, "");
    setExpression({
      value: value,
      display: value,
    });
  };

  const KEYS = [
    { display: "7", value: 7, onClick: addExpression },
    { display: "8", value: 8, onClick: addExpression },
    { display: "9", value: 9, onClick: addExpression },
    { display: "del", onClick: delExpression, classes: ["special", "reset"] },
    { display: "4", value: 4, onClick: addExpression },
    { display: "5", value: 5, onClick: addExpression },
    { display: "6", value: 6, onClick: addExpression },
    { display: "+", value: "+", onClick: addExpression, classes: ["special"] },
    { display: "1", value: 1, onClick: addExpression },
    { display: "2", value: 2, onClick: addExpression },
    { display: "3", value: 3, onClick: addExpression },
    { display: "-", value: "-", onClick: addExpression, classes: ["special"] },
    { display: ".", value: ".", onClick: addExpression },
    { display: "0", value: 0, onClick: addExpression },
    { display: "/", value: "/", onClick: addExpression, classes: ["special"] },
    { display: "x", value: "*", onClick: addExpression, classes: ["special"] },
    {
      display: "reset",
      onClick: resetExpression,
      classes: ["bottom-buttons", "reset"],
    },
    { display: "=", onClick: submitInput, classes: ["bottom-buttons", "submit"] },
  ];

  useLayoutEffect(() => {
    displayRef.current.style.height = "auto";
    displayRef.current.style.height = displayRef.current.scrollHeight + "px";
  }, [expression]);

 

  return (
    <div className="wrapper">
    
        <title className="titleCls">Calculator</title>
   
      <main className="container">
        
        {error && <div className="error">{error}</div>}

        <div className="display">
          <textarea
            ref={displayRef}
            value={expression.display}
            rows={1}
            onChange={forceChange}
          />
        </div>
        <div className="key_pad">
          {KEYS.map((key, i) => (
            <Button {...key} key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}