import { Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomBox from "./CustomBox";
import TaskListItem from "./TaskListItem";
import Loading from "./Loading";
import SearchTaskForm from "./SearchTaskForm";

const TasksList = ({ tasks, deleteTask, loading }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedTasks.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <CustomBox>
      {loading ? (
        <Loading />
      ) : (
        <SearchTaskForm
          tasks={tasks}
          setSelectedTasks={setSelectedTasks}
          setCurrentPage={setCurrentPage}
        />
      )}

      {!loading && selectedTasks.length === 0 && (
        <Typography variant="body1" color="white" textAlign="center">
          No se encontraron tareas
        </Typography>
      )}

      {!loading && selectedTasks.length > 0 && (
        <>
          {currentItems.map((task) => (
            <TaskListItem task={task} deleteTask={deleteTask} key={task._id} />
          ))}
          <Pagination
            count={Math.ceil(selectedTasks.length / itemsPerPage)}
            size="large"
            page={currentPage}
            color="orange"
            onChange={(event, page) => setCurrentPage(page)}
            sx={{ margin: "auto", paddingTop: 3 }}
          />
        </>
      )}
    </CustomBox>
  );
};

export default TasksList;
