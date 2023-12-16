import React, { useEffect } from "react";
import { getAuth } from "../contexts/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children, needsAuth }) => {
  const { auth, user, logout } = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (needsAuth) {
      !auth && router.push("/login");
    } else {
      auth && router.push("/tasksmanager");
    }
  }, [auth, user]);

  return (
    <>
      {auth && (
        <Box
          sx={{
            padding: 2,
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginLeft: "auto",
              marginRight: 2,
            }}
          >
            <Typography color={"white"}>Bienvenido {user.email} !</Typography>
            <Button onClick={logout} variant="contained" color="delete">
              Logout
            </Button>
          </Box>
        </Box>
      )}

      {children}
    </>
  );
};

export default ProtectedRoute;
