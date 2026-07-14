import { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

import logo from "../assets/ACL_Logo.png";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      await axios.post(
        "http://localhost:8080/register",
        {
          company_id: 1,
          role_id: 3,
          name,
          email,
          password
        }
      );

      alert("Account Created");

      window.location.href = "/login";

    } catch (error) {

      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)"
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 5,
          borderRadius: 4
        }}
      >
        <Box textAlign="center">

          <img
            src={logo}
            alt="ACL"
            width="90"
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            mt={2}
          >
            Create Account
          </Typography>

        </Box>

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={registerUser}
        >
          Create Account
        </Button>

      </Paper>
    </Box>
  );
}

export default Register;