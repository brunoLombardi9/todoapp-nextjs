import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BsTrash3Fill } from "react-icons/Bs";

const TaskListItem = ({ task, deleteTask }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "primary.main",
        padding: 2,
        borderRadius: "5px",
        ":hover": { transform: "scale(1.05)", cursor: "pointer" },
        transition: " 0.1s",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      <Box sx={{ textDecoration: "none", width: "80%" }}>
        <Link href={`/task/${task._id}`} style={{ textDecoration: "none" }}>
          <Typography color={"white"} noWrap>
            {task.title}
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <BsTrash3Fill
          fill="red"
          size={25}
          style={{ cursor: "pointer" }}
          onClick={() => deleteTask(task.taskId || task._id)}
        />
      </Box>
    </Box>
  );
};

export default TaskListItem;
