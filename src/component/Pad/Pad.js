import React, { useState } from "react";
import "./Pad.css";
import { PAD_STATUS } from "../../constants";

const getAudioObj = (path) => {
  const audio = new Audio(path);
  audio.loop = true;

  return audio;
};

const Pad = ({ handleClick, pad }) => {
  const [audio] = useState(
    pad.audioPath ? getAudioObj(pad.audioPath) : undefined
  );

  if (audio) {
    if (pad.status === PAD_STATUS.play) audio.play();
    else {
      audio.pause();
      audio.currentTime = 0;
    }
  }

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
