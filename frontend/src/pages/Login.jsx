import { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import logo from "../assets/ACL_Logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    setError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value && value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
    setError("");
  };

  const loginUser = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data);
      localStorage.setItem("email", email);

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password) {
      loginUser();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        padding: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "-50px",
          right: "-50px",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
      `}</style>

      <Paper
        elevation={24}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 5,
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, rgb(4, 4, 51) 0%, rgb(14, 8, 29) 100%)",
              borderRadius: "30px",
              padding: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <img src={logo} alt="ACL Logo" width="100"  />
          </Box>

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
            ProjectPilot
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Apt Computing Labs
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: "14px",
              mt: 2,
            }}
          >
            Professional Project Management System
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "500",
            }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <Box>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            placeholder="admin@example.com"
            type="email"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#64748b", mr: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "#f8fafc",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root:hover": {
                background: "#f1f5f9",
              },
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#64748b", mr: 1 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#64748b" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "#f8fafc",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root:hover": {
                background: "#f1f5f9",
              },
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={loginUser}
            disabled={loading || !email || !password}
            sx={{
              mt: 3,
              mb: 2,
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
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Links Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Link
              href="/forgot-password"
              sx={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#3b82f6",
                textDecoration: "none",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#2563eb",
                  textDecoration: "underline",
                },
              }}
            >
              Forgot Password?
            </Link>

            <Typography sx={{ fontSize: "13px", color: "#64748b" }}>or</Typography>

            <Link
              href="/register"
              sx={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#3b82f6",
                textDecoration: "none",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#2563eb",
                  textDecoration: "underline",
                },
              }}
            >
              Create Account
            </Link>
          </Box>
        </Box>

        {/* Footer */}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "12px",
            color: "#94a3b8",
            mt: 4,
            pt: 3,
            borderTop: "1px solid #e2e8f0",
          }}
        >
          © 2024 Apt Computing Labs. All rights reserved.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;