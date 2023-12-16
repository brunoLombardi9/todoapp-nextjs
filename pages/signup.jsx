import React, { useContext, useLayoutEffect, useState } from "react";
import CustomBox from "../components/CustomBox";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { getAuth } from "../contexts/AuthContext";
import Link from "next/link";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  // const { login, user } = getAuth()
  const [error, setError] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Las contraseñas deben tener al menos 8 dígitos.");
      setLoading(false);
      return;
    }

    try {
      const bodyData = { email, password };
      const { data } = await axios.post("/api/signup", bodyData);
      // login(data);
    } catch (err) {
      if (err?.response) {
        return setError(err?.response?.data?.error);
      }
      setError(err?.error);
    } finally {
      setLoading(false);
    }
  }

  function handleGoogle(e) {
    e.preventDefault();
  }

  useLayoutEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Box sx={{ margin: "auto" }}>
      <CustomBox>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          paddingBottom={2}
          component={"form"}
          onSubmit={handleSignup}
        >
          <TextField
            placeholder="E-mail"
            type="email"
            sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            placeholder="Contraseña"
            type="password"
            sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            placeholder="Confirme contraseña"
            type="password"
            sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button
            variant="contained"
            color="orange"
            type="submit"
            disabled={!email || !password || !passwordConfirmation || loading}
            sx={{ padding: 1.1 }}
          >
            {loading ? <CircularProgress /> : "Registrarse"}
          </Button>
          {/* 
        <Button variant="contained" color="success" onClick={handleGoogle}>
          Registrarse con Google
          <FcGoogle size={30} />
        </Button> */}
        </Box>

        <Typography fontSize={14}>
          Ya tiene una cuenta?{" "}
          <Link href={"/login"} style={{ textDecoration: "none" }}>
            Ingrese aqui
          </Link>
        </Typography>
      </CustomBox>
    </Box>
  );
};

export default Signup;
