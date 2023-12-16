import React, { useEffect, useState } from "react";
import CreateTasksForm from "../components/CreateTaskForm";
import TasksList from "../components/TasksList";
import { Grid } from "@mui/material";
import axios from "axios";
import indexController from "@/page controllers/indexController";

const TasksManager = ({ userId, userTasks }) => {
  const [tasks, setTasks] = useState(userTasks);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getTasks() {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/tasksmanager/${userId}`);
      setTasks(data);
    } catch (error) {
      console.log("Algo salio mal, intente nuevamente mas tarde.");
    }
    setLoading(false);
  }

  function handleSearch() {
    setSearch(true);
  }

  async function deleteTask(taskId) {
    try {
      const params = new URLSearchParams();
      params.append("taskId", taskId);
      await axios.delete(`/api/task`, { params });
      setSearch(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (search) {
      getTasks();
      setSearch(false);
    }
  }, [search]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        width: "100%",
        minHeight: "100%",
        gap: 5,
        padding: 5,
      }}
    >
      <CreateTasksForm handleSearch={handleSearch} loading={loading} />
      <TasksList tasks={tasks} deleteTask={deleteTask} loading={loading} />
    </Grid>
  );
};

export default TasksManager;

export async function getServerSideProps({ req, res }) {
  const props = await indexController(req, res);
  return props;
}
