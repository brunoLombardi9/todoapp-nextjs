import React, { useContext, useState } from "react";
import CustomBox from "./CustomBox";
import { Box, Button, TextField } from "@mui/material";
import { authContext } from "../contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";

const UpdateTaskForm = ({ taskData }) => {
  const [title, setTitle] = useState(taskData.title);
  const [date, setDate] = useState(taskData.date);
  const [content, setContent] = useState(taskData.content);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(authContext);
  const router = useRouter();

  async function handleForm(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const bodyData = { title, date, content };
      await axios.put(`/api/task/${taskData._id}`, bodyData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function handleDelete() {
    try {
      const params = new URLSearchParams();
      params.append("userId", user.userId);
      params.append("taskId", taskData._id);
      await axios.delete(`/api/task`, { params });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box onSubmit={handleForm} component={"form"} sx={{ margin: "auto" }}>
      <CustomBox>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            margin: "auto",
            gap: 2,
            paddingBottom: 2,
            paddingTop: 2,
          }}
        >
          <TextField
            placeholder="Título"
            sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={taskData.title}
            inputProps={{ maxLength: 25 }}
          />
          <TextField
            type="date"
            sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
            fullWidth
            onChange={(e) => setDate(e.target.value)}
            defaultValue={taskData.date}
          />
        </Box>

        <TextField
          placeholder="Tarea..."
          type="text"
          onChange={(e) => setContent(e.target.value)}
          defaultValue={taskData.content}
          fullWidth
          multiline
          rows={5}
          sx={{ ".MuiInputBase-root": { backgroundColor: "white" } }}
        />

        <Button
          variant="contained"
          type="submit"
          color="orange"
          disabled={loading}
        >
          Modificar
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="delete"
          onClick={handleDelete}
          disabled={loading}
        >
          Eliminar
        </Button>
      </CustomBox>
    </Box>
  );
};

export default UpdateTaskForm;
