import { useEffect, useState } from "react";
import axios from "axios";

import CreateProject from "../components/CreateProject";

import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@mui/material";

function Projects() {
  const [projects, setProjects] = useState([]);
  const deleteProject = async (id) => {
  try {
    await axios.delete(
      `http://localhost:8080/projects/${id}`
    );

    setProjects(
      projects.filter(
        (project) => project.id !== id
      )
    );

  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    axios
      .get("http://localhost:8080/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Projects
      </Typography>

      <CreateProject />

      <TableContainer
        component={Paper}
        sx={{ mt: 3 }}
      >
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>

              <TableCell>
                <b>Project Name</b>
              </TableCell>

              <TableCell>
                <b>Status</b>
              </TableCell>

              <TableCell>
               <b>Progress</b>
              </TableCell>

              <TableCell>
               <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {projects.map((project) => (
              <TableRow key={project.id}>

                <TableCell>
                  {project.id}
                </TableCell>

                <TableCell>
                  {project.project_name}
                </TableCell>

                <TableCell>
                  {project.status}

                </TableCell>


                <TableCell width="250">
  <LinearProgress
    variant="determinate"
    value={70}
  />
</TableCell>

                <TableCell>
  {Math.floor(Math.random() * 100)}%
</TableCell>

                <TableCell>
                <Button
                  variant="contained"
                    color="error"
                      onClick={() =>
                     deleteProject(project.id)
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

export default Projects;