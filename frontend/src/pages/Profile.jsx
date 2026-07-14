import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "",
    company: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const email = localStorage.getItem("email");
      const response = await axios.post("http://localhost:8080/profile", {
        email,
      });
      setUser(response.data);
      setEditData(response.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(user);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/update-profile", editData);
      setUser(editData);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.log(err);
      setError("Failed to update profile");
    }
  };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  if (loading) {
    return (
      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Failed to load profile</Alert>
      </Box>
    );
  }

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
          My Profile
        </Typography>
        <Typography sx={{ color: "#64748b", fontSize: "14px" }}>
          View and manage your account information
        </Typography>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: "8px" }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: "8px" }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0",
              textAlign: "center",
              p: 3,
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: "auto",
                fontSize: 40,
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                mb: 2,
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
              variant="h6"
              fontWeight="700"
              sx={{
                color: "#0f172a",
                mb: 1,
              }}
            >
              {user.name}
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "13px",
                mb: 2,
              }}
            >
              {user.email}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                background: "#dbeafe",
                borderRadius: "8px",
                padding: "8px 12px",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#0c4a6e",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {user.role}
              </Typography>
            </Box>

            {!isEditing && (
              <Button
                fullWidth
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  textTransform: "none",
                  fontWeight: "600",
                  borderRadius: "8px",
                }}
              >
                Edit Profile
              </Button>
            )}
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{
                  color: "#0f172a",
                  mb: 3,
                }}
              >
                Account Information
              </Typography>

              {isEditing ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={editData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    value={editData.email}
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Role"
                    value={editData.role}
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Company"
                    value={editData.company || "Apt Computing Labs"}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      sx={{
                        background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                        textTransform: "none",
                        fontWeight: "600",
                        borderRadius: "8px",
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{
                        borderColor: "#e2e8f0",
                        color: "#64748b",
                        textTransform: "none",
                        fontWeight: "600",
                        borderRadius: "8px",
                        "&:hover": {
                          borderColor: "#cbd5e1",
                          background: "#f8fafc",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        mb: 0.5,
                      }}
                    >
                      Full Name
                    </Typography>
                    <Typography sx={{ fontSize: "15px", color: "#0f172a", fontWeight: "500" }}>
                      {user.name}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        mb: 0.5,
                      }}
                    >
                      Email Address
                    </Typography>
                    <Typography sx={{ fontSize: "15px", color: "#0f172a", fontWeight: "500" }}>
                      {user.email}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        mb: 0.5,
                      }}
                    >
                      Role
                    </Typography>
                    <Typography sx={{ fontSize: "15px", color: "#0f172a", fontWeight: "500" }}>
                      {user.role}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        mb: 0.5,
                      }}
                    >
                      Company
                    </Typography>
                    <Typography sx={{ fontSize: "15px", color: "#0f172a", fontWeight: "500" }}>
                      Apt Computing Labs
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;