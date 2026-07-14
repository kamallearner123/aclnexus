import { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

function ForgotPassword() {

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const sendOtp = async () => {

    try {

      await axios.post(
        "http://localhost:8080/send-otp",
        { email }
      );

      alert("OTP Sent");

      setStep(2);

    } catch {

      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8080/verify-otp",
        {
          email,
          otp
        }
      );

      if (res.data === "OTP Verified") {

        alert("OTP Verified");

        setStep(3);

      } else {

        alert("Invalid OTP");
      }

    } catch {

      alert("Verification Failed");
    }
  };

  const updatePassword = async () => {

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/change-password",
        {
          email,
          password
        }
      );

      alert("Password Updated");

      window.location.href = "/login";

    } catch {

      alert("Failed");
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
          "linear-gradient(135deg,#0f172a,#1e293b)"
      }}
    >
      <Paper
        sx={{
          width: 450,
          p: 5,
          borderRadius: 4
        }}
      >

        <Typography
          variant="h4"
          mb={3}
          fontWeight="bold"
        >
          Forgot Password
        </Typography>

        {step === 1 && (
          <>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e)=>
                setEmail(e.target.value)
              }
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={sendOtp}
            >
              Send OTP
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <TextField
              fullWidth
              label="OTP"
              margin="normal"
              value={otp}
              onChange={(e)=>
                setOtp(e.target.value)
              }
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={verifyOtp}
            >
              Verify OTP
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              margin="normal"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              margin="normal"
              value={confirmPassword}
              onChange={(e)=>
                setConfirmPassword(e.target.value)
              }
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={updatePassword}
            >
              Update Password
            </Button>
          </>
        )}

      </Paper>
    </Box>
  );
}

export default ForgotPassword;