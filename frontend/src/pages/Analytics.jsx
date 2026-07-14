import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import {
  Box,
  Paper,
  Typography
} from "@mui/material";

function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/analytics")
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!analytics) {
    return <h2>Loading...</h2>;
  }

  const data = [
    {
      name: "Projects",
      count: analytics.total_projects,
    },
    {
      name: "Tasks",
      count: analytics.total_tasks,
    },
    {
      name: "Completed",
      count: analytics.completed_tasks,
    },
    {
      name: "Pending",
      count: analytics.pending_tasks,
    },
  ];

  return (
    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Analytics Dashboard
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>

        <Typography variant="h6">
          Project Completion
        </Typography>

        <Typography
          variant="h3"
          fontWeight="bold"
        >
          {analytics.project_completion.toFixed(0)}%
        </Typography>

      </Paper>

      <Paper sx={{ p: 3 }}>

        <Typography
          variant="h6"
          mb={2}
        >
          Project Statistics
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>

      </Paper>

    </Box>
  );
}

export default Analytics;