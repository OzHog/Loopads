import React from "react";
import IconButton from "@mui/material/IconButton";
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";

const PowerButton = ({ power, handlePower }) => {
  return (
    <>
      <IconButton size="small" style={{position: "relative"}} onClick={() => handlePower()} disableRipple={true}>
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
