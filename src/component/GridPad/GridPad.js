import React from "react";
import Pad from "../Pad/Pad";
import "./GridPad.css";

const GridPad = ({ audioPlayer, pads, handlePadClick }) => {
  return (
    <div className="gridPad">
      {pads &&
        pads.map((pad) => (
          <Pad
          audioPlayer={audioPlayer}
            key={pad.key}
            handleClick={handlePadClick}
            pad={pad}
          />
        ))}
    </div>
  );
};

export default GridPad;
