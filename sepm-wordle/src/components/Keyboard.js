import React from "react";
import Key from "./Key";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="keyboard">
      <div className="firstLine">
        {keys1.map((key) => {
          return <Key keyval={key} />;
        })}
      </div>
      <div className="secondLine">
        {keys2.map((key) => {
          return <Key keyval={key} />;
        })}
      </div>
      <div className="thirdLine">
        <Key keyval={"DELETE"} functionKey />
        {keys3.map((key) => {
          return <Key keyval={key} />;
        })}
        <Key keyval={"ENTER"} functionKey />
      </div>
    </div>
  );
}

export default Keyboard;
