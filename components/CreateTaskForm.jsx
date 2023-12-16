import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import CustomBox from "./CustomBox";
import { authContext } from "../contexts/AuthContext";
import axios from "axios";

const CreateTasksForm = ({ handleSearch, loading }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(authContext);

  async function handleForm(e) {
    e.preventDefault();

    try {
      const bodyData = { title, date, content, userId: user.userId };
      await axios.post("/tasksmanager", bodyData);
      handleSearch();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      onSubmit={handleForm}
      component={"form"}
      sx={{ marginTop: "auto", marginBottom: "auto" }}
    >
      <CustomBox>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            margin: "auto",
            gap: 2,
            paddingBottom: 2,
          }}
        >
          <TextField
            placeholder="Título"
            sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ maxLength: 25 }}
          />
          <TextField
            type="date"
            sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
            fullWidth
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>

        <TextField
          placeholder="Tarea..."
          type="text"
          onChange={(event) => setContent(event.target.value)}
          fullWidth
          multiline
          rows={5}
          sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
        />

        <Button
          variant="contained"
          type="submit"
          color="orange"
          disabled={!title || loading}
          sx={{ marginTop: "2rem" }}
        >
          Agregar tarea
        </Button>
      </CustomBox>
    </Box>
  );
};

export default CreateTasksForm;
