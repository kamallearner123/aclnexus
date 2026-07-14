import { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link
} from "@mui/material";

import logo from "../assets/ACL_Logo.png";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {

      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data
      );

      localStorage.setItem(
        "email",
        email
      );

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {

      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <Box
      sx={{
       minHeight: "100vh",
background:
  "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
padding: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
         width: "100%",
maxWidth: 450,
p: 5,
borderRadius: "20px",
        }}
      >
        <Box textAlign="center">

          <img
            src={logo}
            alt="ACL Logo"
            width="120"
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            mt={2}
          >
            ProjectPilot
          </Typography>

          <Typography
            color="text.secondary"
            mb={3}
          >
            Apt Computing Labs
          </Typography>

        </Box>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
          onClick={loginUser}
        >
          Login
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Link href="/forgot-password">
            Forgot Password?
          </Link>

          <Link href="/register">
            Create Account
          </Link>
        </Box>

      </Paper>
    </Box>
  );
}

export default Login;