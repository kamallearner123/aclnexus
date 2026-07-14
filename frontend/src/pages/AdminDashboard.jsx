import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/logs")
      .then((res) => setLogs(res.data.slice(0, 5)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="#64748b">
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${bgColor} 0%, ${color} 100%)`,
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
        },
        cursor: "pointer",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "600",
                opacity: 0.9,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              fontWeight="700"
              sx={{ mt: 1.5, fontSize: "36px" }}
            >
              {value}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: "40px", opacity: 0.3 }} />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        p: 4,
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="700"
          sx={{
            color: "#0f172a",
            fontSize: "28px",
            mb: 1,
            letterSpacing: "-0.5px",
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography sx={{ color: "#64748b", fontSize: "14px" }}>
          Welcome back! Here's your project overview.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Projects"
            value={data.total_projects}
            icon={TrendingUpIcon}
            color="#2563eb"
            bgColor="#dbeafe"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value={data.total_tasks}
            icon={TrendingUpIcon}
            color="#16a34a"
            bgColor="#dcfce7"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Tasks"
            value={data.completed_tasks}
            icon={CheckCircleIcon}
            color="#f59e0b"
            bgColor="#fef3c7"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Team Members"
            value={data.total_team_members}
            icon={TrendingUpIcon}
            color="#8b5cf6"
            bgColor="#f3e8ff"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          mb: 4,
          border: "1px solid #e2e8f0",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ mb: 2, color: "#0f172a" }}
          >
            Quick Actions
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/projects"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "8px",
                px: 3,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                },
              }}
            >
              New Project
            </Button>

            <Button
              component={Link}
              to="/tasks"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "8px",
                px: 3,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.4)",
                },
              }}
            >
              New Task
            </Button>

            <Button
              component={Link}
              to="/milestones"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "8px",
                px: 3,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)",
                },
              }}
            >
              New Milestone
            </Button>

            <Button
              component={Link}
              to="/team-members"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "8px",
                px: 3,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
                },
              }}
            >
              Add Team Member
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: "1px solid #e2e8f0" }}>
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{ color: "#0f172a" }}
            >
              Recent Activity
            </Typography>
          </Box>

          {logs.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: "600", fontSize: "12px" }}>
                    Action
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", fontSize: "12px" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", fontSize: "12px" }}>
                    Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": { background: "#f8fafc" },
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <TableCell sx={{ fontSize: "13px", color: "#0f172a" }}>
                      {log.message || log.action}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={log.type || "Update"}
                        size="small"
                        sx={{
                          fontSize: "11px",
                          fontWeight: "600",
                          background: "#dbeafe",
                          color: "#0c4a6e",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px", color: "#64748b" }}>
                      {new Date().toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography sx={{ color: "#94a3b8", fontSize: "13px" }}>
                No recent activity
              </Typography>
            </Box>
          )}

          <Box sx={{ p: 3, borderTop: "1px solid #e2e8f0" }}>
            <Button
              component={Link}
              to="/activity-logs"
              sx={{
                color: "#3b82f6",
                textTransform: "none",
                fontWeight: "600",
                fontSize: "13px",
                "&:hover": { background: "#dbeafe" },
              }}
            >
              View All Activity →
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


       

export default AdminDashboard;
