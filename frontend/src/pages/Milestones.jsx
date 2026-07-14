import { useEffect, useState } from "react";
import axios from "axios";

import CreateMilestone from "../components/CreateMilestone";

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

function Milestones() {
  const [milestones, setMilestones] = useState([]);
  const deleteMilestone = async (id) => {
  try {
    await axios.delete(
      `http://localhost:8080/milestones/${id}`
    );

    setMilestones(
      milestones.filter(
        (milestone) => milestone.id !== id
      )
    );
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    axios
      .get("http://localhost:8080/milestones")
      .then((res) => setMilestones(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Milestones
      </Typography>

      <CreateMilestone />

      <TableContainer
        component={Paper}
        sx={{ mt: 3 }}
      >
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Project ID</b></TableCell>
              <TableCell><b>Milestone Name</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>

            {milestones.map((milestone) => (
              <TableRow key={milestone.id}>
                <TableCell>{milestone.id}</TableCell>

<TableCell>
  {milestone.project_id}
</TableCell>

<TableCell>
  {milestone.milestone_name}
</TableCell>

<TableCell>
  <Button
    variant="contained"
    color="error"
    onClick={() =>
      deleteMilestone(milestone.id)
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

export default Milestones;