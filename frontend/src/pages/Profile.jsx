import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider
} from "@mui/material";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const email =
      localStorage.getItem("email");

    axios
      .post(
        "http://localhost:8080/profile",
        { email }
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <Box sx={{ p: 4 }}>

      <Paper
        sx={{
          maxWidth: 700,
          margin: "auto",
          p: 4,
          borderRadius: 4,
        }}
      >

        <Box
          sx={{
            textAlign: "center",
          }}
        >

          <Avatar
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              fontSize: 40,
            }}
          >
            {user.name?.charAt(0)}
          </Avatar>

          <Typography
            variant="h4"
            mt={2}
          >
            {user.name}
          </Typography>

        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography>
          <b>Email:</b> {user.email}
        </Typography>

        <Typography mt={2}>
          <b>Role:</b> {user.role}
        </Typography>

        <Typography mt={2}>
          <b>Company:</b> Apt Computing Labs
        </Typography>

      </Paper>

    </Box>
  );
}

export default Profile;