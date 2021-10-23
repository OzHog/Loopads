import React, { useState, useEffect } from "react";
import { RECORDER_STATUS } from "../../constants";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

const Recorder = ({ pads, status, handleStatus, setPadsSnapshot }) => {
  const [padsSnapshots, setPadsSnapshots] = useState([]);

  const setSnapShot = () => {
    const snapshot = pads.map((pad) => {
      return { ...pad };
    });

    setPadsSnapshots(
      padsSnapshots.concat({
        pads: snapshot,
        timestamp: Date.now(),
        key: padsSnapshots.length,
      })
    );
  };

  const handleRecordButton = () => {
    switch (status) {
      case RECORDER_STATUS.stop:
        setPadsSnapshots([]); //clear padsSnapshots array
        setSnapShot();
        handleStatus(RECORDER_STATUS.record);
        break;
      case RECORDER_STATUS.record:
        setSnapShot();
        handleStatus(RECORDER_STATUS.stop);
        break;
      default:
        console.log("record Status doesn't exist");
        break;
    }
  };

  const displaySnapshot = (snapshot) => {
    //pass the snpashot to LoopPad component
    setPadsSnapshot(snapshot.pads);


    if (snapshot.key + 1 < padsSnapshots.length) {
      //calculate delta between adjacent snapshots
      const delay =
        padsSnapshots[snapshot.key + 1].timestamp -
        padsSnapshots[snapshot.key].timestamp;
      setTimeout(displaySnapshot, delay, padsSnapshots[snapshot.key + 1]);
    } else handleStatus(RECORDER_STATUS.stop); //set the last snapshot - recoreder stop play
  };

  const handlePlayButton = () => {
    handleStatus(RECORDER_STATUS.play);
    displaySnapshot(padsSnapshots[0]);
  };

  //create a snapshot every pads change
  useEffect(() => {
    if (status === RECORDER_STATUS.record) setSnapShot();
  }, [pads]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "20%",
      }}
    >
      {status === RECORDER_STATUS.stop && padsSnapshots.length > 2 && ( 
        //padsSnapshots.length > 2: two snapshots added when start and stop recorder, if padsSnapshots.length is at least three => some of the pads changed  
        <IconButton onClick={handlePlayButton}>
          <PlayArrowSharpIcon fontSize="mediom" />
        </IconButton>
      )}

      <div style={{ display: "flex" }}>
        <Button
          variant="text"
          style={{ color: "black" }}
          onClick={handleRecordButton}
          endIcon={
            <FiberManualRecordSharpIcon
              fontSize="mediom"
              style={{
                color: status === RECORDER_STATUS.record ? "red" : "black",
              }}
            />
          }
        >
          REC
        </Button>
      </div>
    </div>
  );
};

export default Recorder;
