import { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[!@#$%^&*]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
    setError("");
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return "#ef4444";
    if (passwordStrength < 60) return "#f59e0b";
    return "#16a34a";
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 30) return "Weak";
    if (passwordStrength < 60) return "Fair";
    return "Strong";
  };

  const validatePasswords = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return false;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const changePassword = async () => {
    if (!validatePasswords()) return;

    setLoading(true);
    setError("");

    try {
      const email = localStorage.getItem("email");
      await axios.post("http://localhost:8080/change-password", {
        email,
        currentPassword,
        newPassword,
      });

      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStrength(0);

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Failed to change password. Please check your current password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && currentPassword && newPassword && confirmPassword) {
      changePassword();
    }
  };

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
          Change Password
        </Typography>
        <Typography sx={{ color: "#64748b", fontSize: "14px" }}>
          Update your account password to keep your account secure
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
        }}
      >
        {/* Alerts */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, borderRadius: "8px" }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            icon={<CheckCircle />}
            sx={{ mb: 2, borderRadius: "8px" }}
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        )}

        {/* Password Change Card */}
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #e2e8f0",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Current Password */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#0f172a",
                  mb: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Current Password
              </Typography>
              <TextField
                fullWidth
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#64748b", mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        edge="end"
                        sx={{ color: "#64748b" }}
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>

            {/* New Password */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#0f172a",
                  mb: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                New Password
              </Typography>
              <TextField
                fullWidth
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#64748b", mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                        sx={{ color: "#64748b" }}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />

              {/* Password Strength Indicator */}
              {newPassword && (
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography sx={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                      Password Strength
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: getPasswordStrengthColor(),
                        fontWeight: "700",
                      }}
                    >
                      {getPasswordStrengthLabel()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    sx={{
                      height: "6px",
                      borderRadius: "3px",
                      background: "#e2e8f0",
                      "& .MuiLinearProgress-bar": {
                        background: getPasswordStrengthColor(),
                        borderRadius: "3px",
                      },
                    }}
                  />
                  <Box sx={{ mt: 1.5 }}>
                    <Typography sx={{ fontSize: "12px", color: "#64748b", mb: 0.5 }}>
                      Password should contain:
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: newPassword.length >= 8 ? "#16a34a" : "#94a3b8",
                        }}
                      >
                        ✓ At least 8 characters
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: /[a-z]/.test(newPassword) ? "#16a34a" : "#94a3b8",
                        }}
                      >
                        ✓ Lowercase letters (a-z)
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: /[A-Z]/.test(newPassword) ? "#16a34a" : "#94a3b8",
                        }}
                      >
                        ✓ Uppercase letters (A-Z)
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: /[0-9]/.test(newPassword) ? "#16a34a" : "#94a3b8",
                        }}
                      >
                        ✓ Numbers (0-9)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Confirm Password */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#0f172a",
                  mb: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                error={confirmPassword && newPassword !== confirmPassword}
                helperText={
                  confirmPassword && newPassword !== confirmPassword
                    ? "Passwords do not match"
                    : ""
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#64748b", mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: "#64748b" }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={changePassword}
              disabled={loading || !currentPassword || !newPassword || !confirmPassword}
              sx={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                fontWeight: "700",
                fontSize: "15px",
                padding: "12px",
                borderRadius: "8px",
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
                },
                "&:disabled": {
                  background: "#cbd5e1",
                  color: "#f1f5f9",
                },
              }}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : "Change Password"}
            </Button>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #fef3c7",
            background: "#fffbeb",
            mt: 3,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#92400e",
                mb: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Security Tips
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              <Typography sx={{ fontSize: "12px", color: "#b45309" }}>
                • Use a strong password with at least 8 characters
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#b45309" }}>
                • Include uppercase, lowercase, numbers, and symbols
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#b45309" }}>
                • Never share your password with anyone
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#b45309" }}>
                • Change your password regularly for better security
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ChangePassword;