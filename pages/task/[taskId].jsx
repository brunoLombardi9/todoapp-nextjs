import React, { useEffect, useState } from "react";
import CustomBox from "../../components/CustomBox";
import { CircularProgress, Grid } from "@mui/material";
import UpdateTaskForm from "../../components/UpdateTaskForm";
import axios from "axios";
import { useRouter } from "next/router";

const TaskDetail = () => {
  const [taskData, setTaskData] = useState(null);
  const { query } = useRouter();
  const taskId = query.taskId;

  // async function getTaskInfo() {
  //   try {
  //     const params = new URLSearchParams()
  //     params.append("userId", )
  //     params.append("taskId", taskId)
  //     const { data } = await axios.get(`/api/task`, params);
  //     setTaskData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getTaskInfo();
  // }, []);
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {taskData ? (
        <UpdateTaskForm taskData={taskData} />
      ) : (
        <CustomBox>
          <CircularProgress sx={{ margin: "auto", padding: 2 }} />
        </CustomBox>
      )}
    </Grid>
  );
};

export default TaskDetail;
