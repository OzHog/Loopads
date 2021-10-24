import React, { useState, useEffect } from "react";
import "./Pad.css";
import { PAD_STATUS } from "../../constants";

const Pad = ({ handleClick, pad, audioPlayer }) => {
  const [soundID, setSoundID] = useState(null);

  useEffect(() => {
    if (pad.status === PAD_STATUS.play) {
      const newsoundID = audioPlayer.play(pad.label, soundID);

      setSoundID(newsoundID);
    } else if (soundID) {
      audioPlayer.stop(soundID);
      setSoundID(null);
    }
  }, [pad.status, pad.label, audioPlayer]);

  return (
    <div
      className="pad"
      status={pad.status}
      onClick={() => handleClick(pad.key)}
    >
      <div className="neonLabel"> {pad.label}</div>
    </div>
  );
};

export default Pad;
