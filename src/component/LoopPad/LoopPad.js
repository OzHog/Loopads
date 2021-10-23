import React, { useState } from "react";
import { PADS, PAD_STATUS, RECORDER_STATUS } from "../../constants";
import { GridPad, Tempo, PowerButton, Recorder} from "../";
import "./LoopPad.css";

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

  const stopPlayingPads = () => {
    let newPadsState = pads.map((pad) => {
      if (pad.status === PAD_STATUS.play) {
        pad.status = PAD_STATUS.wait;
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
    else newPadsState[index].status = PAD_STATUS.stop;

    setPads(newPadsState);
  };

  const handleRecorderStatus = (status) => {
    setRecorder((recorder) => {
      return { ...recorder, ...{ status: status } };
    });

    if (status === RECORDER_STATUS.stop) stopPlayingPads();
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
            pads={
              recorder.status === RECORDER_STATUS.play && recorder.padsSnapshot
                ? recorder.padsSnapshot
                : pads
            }
            handlePadClick={handlePadClick}
          />
        </div>

        <div recorder-status={recorder.status} className="lowbar_container">
          <PowerButton power={power} handlePower={handlePower} />
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
