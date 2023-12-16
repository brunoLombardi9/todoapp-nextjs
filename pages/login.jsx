import React, { useContext, useEffect, useState } from "react";
import CustomBox from "../components/CustomBox";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { getAuth } from "../contexts/AuthContext";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = getAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const bodyData = { email, password };
      const { data } = await axios.post("/api/login", bodyData);
      console.log(data);
      router.push("/")
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

  useEffect(() => {
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
          onSubmit={handleLogin}
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
          <Button
            variant="contained"
            color="orange"
            type="submit"
            disabled={!email || !password || loading}
            sx={{ padding: 1.1 }}
          >
            {loading ? <CircularProgress/> : "Entrar"}
          </Button>

          {/* <Button variant="contained" color="success" onClick={handleGoogle}>
          Entrar con Google
          <FcGoogle size={30} />
        </Button> */}
        </Box>

        <Typography fontSize={14}>
          No tiene una cuenta?{" "}
          <Link href={"/signup"} style={{ textDecoration: "none" }}>
            Registro
          </Link>
        </Typography>
      </CustomBox>
    </Box>
  );
};

export default Login;
