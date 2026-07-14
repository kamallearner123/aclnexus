import { useEffect, useState } from "react";
import axios from "axios";

import CreateTask from "../components/CreateTask";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@mui/material";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    axios
      .get("http://localhost:8080/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/tasks/${id}`
      );

      setTasks(
        tasks.filter(
          (task) => task.id !== id
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Tasks
      </Typography>

      <CreateTask />

      <TableContainer
        component={Paper}
        sx={{ mt: 3 }}
      >
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Project ID</b></TableCell>
              <TableCell><b>Task Name</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {tasks.map((task) => (
              <TableRow key={task.id}>

                <TableCell>
                  {task.id}
                </TableCell>

                <TableCell>
                  {task.project_id}
                </TableCell>

                <TableCell>
                  {task.task_name}
                </TableCell>

                <TableCell>
                  {task.status}
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    Delete
                  </Button>
                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>

    </Box>
  );
}

export default Tasks;