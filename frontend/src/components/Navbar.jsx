import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const email = localStorage.getItem("email");
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={2}
      sx={{
        background: "linear-gradient(to right, #ffffff 0%, #f8fafc 100%)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            color: "#0f172a",
            fontSize: "18px",
            letterSpacing: "-0.5px",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: "8px 16px",
              borderRadius: "8px",
              background: "#f1f5f9",
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {email?.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Welcome
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#0f172a",
                  fontWeight: "600",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                }}
              >
                {email}
              </Typography>
            </Box>
          </Box>

          <Button
            onClick={handleClick}
            sx={{
              textTransform: "none",
              color: "#0f172a",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              "&:hover": {
                background: "#e2e8f0",
              },
            }}
          >
            <AccountCircleIcon sx={{ mr: 1 }} />
            Profile
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: {
                borderRadius: "8px",
                marginTop: "8px",
              },
            }}
          >
            <MenuItem disabled sx={{ fontSize: "12px", color: "#64748b" }}>
              Signed in as: {email}
            </MenuItem>
            <MenuItem
              component="a"
              href="/profile"
              sx={{ fontSize: "13px" }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              component="a"
              href="/change-password"
              sx={{ fontSize: "13px" }}
            >
              Change Password
            </MenuItem>
          </Menu>

          <Button
            variant="contained"
            onClick={logout}
            sx={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
              },
            }}
          >
            <LogoutIcon sx={{ mr: 0.5, fontSize: "16px" }} />
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;