import { Box } from "@mui/system";
import React from "react";

const CustomBox = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: "60vw", md: "30vw" },
        padding: 5,
        borderRadius: "10px",
        boxShadow: 10,
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default CustomBox;
