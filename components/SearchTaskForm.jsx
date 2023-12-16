import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const SearchTaskForm = ({ tasks, setSelectedTasks, setCurrentPage }) => {
  const [input, setInput] = useState("");

  function searchTask() {
    const inputWords = input.toLowerCase().split(" ");

    const filteredTasks = tasks.filter((task) => {
      const taskTitleWords = task.title.toLowerCase().split(" ");
      for (let i = 0; i < inputWords.length; i++) {
        const coincidence = taskTitleWords.some((word) => {
          return word === inputWords[i];
        });
        return coincidence;
      }
    });

    setCurrentPage(1);

    if (!input) {
      return setSelectedTasks(tasks);
    }

    if (filteredTasks.length > 0) {
      return setSelectedTasks(filteredTasks);
    }

    if (filteredTasks.length === 0) {
      return setSelectedTasks([]);
    }
  }

  useEffect(() => {
    searchTask();
  }, [input]);

  return (
    <TextField
      placeholder="Buscar tarea"
      onChange={(e) => setInput(e.target.value)}
      sx={{
        ".MuiInputBase-root": {
          backgroundColor: "white",
          borderRadius: 10,
        },
        width: "100%",
        paddingBottom: 2,
      }}
    />
  );
};

export default SearchTaskForm;
