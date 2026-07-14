import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button
} from "@mui/material";
function AdminDashboard() {

  const [data, setData] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:8080/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    axios
  .get("http://localhost:8080/logs")
  .then((res) => setLogs(res.data))
  .catch((err) => console.log(err));

  }, []);

  if (!data) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={3}>
          <Card
  sx={{
    background: "#2563eb",
    color: "white",
    borderRadius: 3
  }}
>
  <CardContent>
    <Typography>
      Total Projects
    </Typography>

    <Typography
      variant="h3"
      fontWeight="bold"
    >
      {data.total_projects}
    </Typography>
  </CardContent>
</Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
  sx={{
    background: "#16a34a",
    color: "white",
    borderRadius: 3
  }}
>
            <CardContent>
              <Typography color="text.secondary">
                Total Tasks
              </Typography>
              <Typography variant="h4">
                {data.total_tasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
  sx={{
    background: "#f59e0b",
    color: "white",
    borderRadius: 3
  }}
>
            <CardContent>
              <Typography color="text.secondary">
                Completed Tasks
              </Typography>
              <Typography variant="h4">
                {data.completed_tasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
  sx={{
    background: "#f59e0b",
    color: "white",
    borderRadius: 3
  }}
>
            <CardContent>
              <Typography color="text.secondary">
                Team Members
              </Typography>
              <Typography variant="h4">
                {data.total_team_members}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <Box sx={{ mt: 4, mb: 4 }}>

  <Typography
    variant="h5"
    fontWeight="bold"
    mb={2}
  >
    Quick Actions
  </Typography>

  <Button
    component={Link}
    to="/projects"
    variant="contained"
    sx={{ mr: 2 }}
  >
    New Project
  </Button>

  <Button
    component={Link}
    to="/tasks"
    variant="contained"
    sx={{ mr: 2 }}
  >
    New Task
  </Button>

  <Button
    component={Link}
    to="/milestones"
    variant="contained"
    sx={{ mr: 2 }}
  >
    New Milestone
  </Button>

  <Button
    component={Link}
    to="/team-members"
    variant="contained"
  >
    Add Team Member
  </Button>

</Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
  Recent Activity
</Typography>

{
  logs.slice(0,5).map((log) => (
    <Typography
      key={log.id}
      sx={{ mb: 1 }}
    >
      ✅ {log.activity}
    </Typography>
  ))
}

          </Paper>
        </Grid>

       

      </Grid>

    </Box>
  );
}

export default AdminDashboard;