import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar
} from "@mui/material";

function Navbar() {

  const email =
    localStorage.getItem("email");

  const logout = () => {

    localStorage.clear();

    window.location.href = "/login";
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={1}
      sx={{
        background: "#ffffff",
      }}
    >
      <Toolbar>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            flexGrow: 1,
            color: "#0f172a",
          }}
        >
          ProjectPilot
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar>
            {email?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography>
            {email}
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;