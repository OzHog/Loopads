import React from "react";
import IconButton from "@mui/material/IconButton";
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";

const PowerButton = ({ power, handlePower, disable }) => {

  return (
    <>
      <IconButton size="small" disabled={disable} style={{position: "relative"}} onClick={() => handlePower()} disableRipple={true}>
        {power ? (
          <StopCircleSharpIcon fontSize="large" />
        ) : (
          <PlayCircleFilledSharpIcon fontSize="large" />
        )}
      </IconButton>
    </>
  );
};

export default PowerButton;
