import React, { useState } from "react";
import { Howl } from "howler";
import {
  PADS,
  PAD_STATUS,
  RECORDER_STATUS,
  SOUND_SAMPLES_PATH,
} from "../../constants";
import { GridPad, Tempo, PowerButton, Recorder } from "../";
import "./LoopPad.css";

const audioPlayer = new Howl({
  src: [
    SOUND_SAMPLES_PATH + "samples.webm",
    SOUND_SAMPLES_PATH + "samples.mp3",
  ],
  preload: true,
  loop: true,
  sprite: {
    Mixer: [0, 8000],
    "Drums I": [10000, 8000],
    Bass: [20000, 8000],
    "Drums II": [30000, 8000],
    Tanggu: [40000, 8000],
    "Blip Blip": [50000, 8000],
    "Drums III": [60000, 8000],
    Organ: [70000, 8000],
    Guitar: [80000, 8000],
  },
});

const LoopPad = () => {
  const [power, setPower] = useState(false);
  const [pads, setPads] = useState(PADS);
  const [recorder, setRecorder] = useState({
    status: RECORDER_STATUS.stop,
    padsSnapshot: null,
  });

  const handlePower = () => {
    let newPowerState = !power;
    if (newPowerState) {
      playWaitingPads();
    } else {
      stopPlayingPads();
    }
    setPower(newPowerState);
  };

  const stopPlayingPads = (statusToStop = false) => {
    let newPadsState = pads.map((pad) => {
      if (pad.status === PAD_STATUS.play) {
        pad.status = statusToStop ? PAD_STATUS.stop : PAD_STATUS.wait;
      }
      return pad;
    });
    setPads(newPadsState);
  };

  const playWaitingPads = () => {
    let newPadsState = pads.map((pad) => {
      if (pad.status === PAD_STATUS.wait) {
        pad.status = PAD_STATUS.play;
      }
      return pad;
    });
    setPads(newPadsState);
  };

  const handlePadClick = (index) => {
    let newPadsState = pads.slice();

    if (newPadsState[index].status === PAD_STATUS.stop)
      newPadsState[index].status = PAD_STATUS.wait;
    else {
      newPadsState[index].status = PAD_STATUS.stop;
    }

    setPads(newPadsState);
  };

  const handleRecorderStatus = (status) => {
    setRecorder((recorder) => {
      return { ...recorder, ...{ status: status } };
    });

    if (status === RECORDER_STATUS.stop) stopPlayingPads(true);
  };

  const setPadsSnapshot = (padsSnapshot) => {
    setRecorder((recorder) => {
      return { ...recorder, ...{ padsSnapshot: padsSnapshot } };
    });
  };

  const handlePlayRecord = (padsSnapshot) => {
    setRecorder({ status: RECORDER_STATUS.play, padsSnapshot: padsSnapshot });
  };

  return (
    <div className="loopPad_container">
      <div className="title_container">
        <h1 className="neon">~ L o o P a d s ~</h1>{" "}
      </div>

      <div className="loopPad">
        <div className="gridPad_container">
          <GridPad
            audioPlayer={audioPlayer}
            pads={
              recorder.status === RECORDER_STATUS.play && recorder.padsSnapshot
                ? recorder.padsSnapshot
                : pads
            }
            handlePadClick={handlePadClick}
          />
        </div>

        <div recorder-status={recorder.status} className="lowbar_container">
          <PowerButton power={power} handlePower={handlePower} disable={recorder.status === RECORDER_STATUS.record}/>
          {power && (
            <>
              <Tempo playWaitingPads={playWaitingPads} />
              <Recorder
                pads={pads}
                status={recorder.status}
                handleStatus={handleRecorderStatus}
                handlePlayRecord={handlePlayRecord}
                setPadsSnapshot={setPadsSnapshot}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoopPad;
