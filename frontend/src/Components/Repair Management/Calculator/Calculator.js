import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleCalculator = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Floating button to toggle calculator */}
      {!isVisible && (
        <button className="calc-toggle-btn" onClick={toggleCalculator}>
          ↑
        </button>
      )}

      {/* Calculator Container */}
      <div className={`calc-container ${isVisible ? "calc-show" : "calc-hide"}`}>
        <div className="calc-main">
          <button className="calc-close-btn" onClick={toggleCalculator}>
            ↓
          </button>
          
          <form className="calc-form">
            <div className="calc-display">
              <input 
                className="calc-input-display" 
                type="text" 
                value={value} 
                readOnly 
              />
            </div>

            <div className="calc-row">
              <input 
                className="calc-btn calc-btn-clear" 
                type="button" 
                value="AC" 
                onClick={() => setValue("")} 
              />
              <input
                className="calc-btn calc-btn-delete"
                type="button"
                value="DE"
                onClick={() => setValue(value.slice(0, -1))}
              />
              <input
                className="calc-btn calc-btn-decimal"
                type="button"
                value="."
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-divide"
                type="button"
                value="/"
                onClick={(e) => setValue(value + e.target.value)}
              />
            </div>

            <div className="calc-row">
              <input
                className="calc-btn calc-btn-7"
                type="button"
                value="7"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-8"
                type="button"
                value="8"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-9"
                type="button"
                value="9"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-multiply"
                type="button"
                value="*"
                onClick={(e) => setValue(value + e.target.value)}
              />
            </div>

            <div className="calc-row">
              <input
                className="calc-btn calc-btn-4"
                type="button"
                value="4"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-5"
                type="button"
                value="5"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-6"
                type="button"
                value="6"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-subtract"
                type="button"
                value="-"
                onClick={(e) => setValue(value + e.target.value)}
              />
            </div>

            <div className="calc-row">
              <input
                className="calc-btn calc-btn-1"
                type="button"
                value="1"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-2"
                type="button"
                value="2"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-3"
                type="button"
                value="3"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-add"
                type="button"
                value="+"
                onClick={(e) => setValue(value + e.target.value)}
              />
            </div>

            <div className="calc-row">
              <input
                className="calc-btn calc-btn-0"
                type="button"
                value="0"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-00"
                type="button"
                value="00"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                className="calc-btn calc-btn-equal"
                type="button"
                value="="
                onClick={() => setValue(eval(value))}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Calculator;