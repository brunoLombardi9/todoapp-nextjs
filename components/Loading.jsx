import { CircularProgress, Grid } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Grid
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"15px"}
      sx={{
        width: "50%",
        minHeight: "200px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default Loading;
