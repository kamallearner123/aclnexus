import { useEffect, useState } from "react";
import axios from "axios";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper
} from "@mui/material";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                Total Projects
              </Typography>
              <Typography variant="h4">
                {data.total_projects}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
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

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
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

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
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

      <Grid container spacing={3} sx={{ mt: 2 }}>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Recent Projects
            </Typography>

            <table width="100%">
              <thead>
                <tr>
                  <th align="left">Project</th>
                  <th align="left">Status</th>
                  <th align="left">Progress</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>PMS Development</td>
                  <td>Active</td>
                  <td>70%</td>
                </tr>

                <tr>
                  <td>Website Redesign</td>
                  <td>Active</td>
                  <td>50%</td>
                </tr>

                <tr>
                  <td>Mobile App</td>
                  <td>Planning</td>
                  <td>20%</td>
                </tr>
              </tbody>
            </table>

          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2}>
              Recent Activity
            </Typography>

            <p>✅ Project Created</p>
            <p>✅ Task Completed</p>
            <p>✅ Milestone Added</p>
            <p>✅ Team Member Added</p>
          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
}

export default Dashboard;