import logo from "../assets/ACL_Logo.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";
import FlagIcon from "@mui/icons-material/Flag";
import GroupIcon from "@mui/icons-material/Group";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HistoryIcon from "@mui/icons-material/History";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Sidebar({ role }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", path: "/", icon: DashboardIcon },
    { label: "My Profile", path: "/profile", icon: PersonIcon },
    { label: "Change Password", path: "/change-password", icon: SecurityIcon },
    ...(role === "Admin" || role === "Manager"
      ? [
          { label: "Projects", path: "/projects", icon: FolderIcon },
          { label: "Tasks", path: "/tasks", icon: TaskIcon },
          { label: "Milestones", path: "/milestones", icon: FlagIcon },
        ]
      : []),
    ...(role === "Admin"
      ? [
          { label: "Team Members", path: "/team-members", icon: GroupIcon },
          { label: "Analytics", path: "/analytics", icon: AnalyticsIcon },
          { label: "Activity Logs", path: "/activity-logs", icon: HistoryIcon },
        ]
      : []),
    { label: "Notifications", path: "/notifications", icon: NotificationsIcon },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        width: isOpen ? "270px" : "70px",
        background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
        boxShadow: "4px 0px 20px rgba(0,0,0,0.15)",
        color: "white",
        height: "100vh",
        padding: "24px 12px",
        overflowY: "auto",
        transition: "all 0.3s ease",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      {/* Logo Section */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
  style={{
    background: "rgba(59,130,246,0.15)",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "16px",
    border: "2px solid rgba(59,130,246,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <img
    src={logo}
    alt="ACL Logo"
    width="70"
    style={{
      display: "block",
      margin: "0 auto",
    }}
  />
</div>
        {isOpen && (
          <>
            <h2
              style={{
                margin: "12px 0 4px",
                fontSize: "20px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
                color: "#3b82f6",
              }}
            >
              ProjectPilot
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#94a3b8",
                fontWeight: "500",
                letterSpacing: "0.5px",
              }}
            >
              APT COMPUTING LABS
            </p>
          </>
        )}
      </div>

      {/* Navigation Items */}
      <nav style={{ marginTop: "24px" }}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive(item.path) ? "#3b82f6" : "#cbd5e1",
                textDecoration: "none",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                padding: "12px 12px",
                borderRadius: "8px",
                marginBottom: "8px",
                background: isActive(item.path)
                  ? "rgba(59, 130, 246, 0.1)"
                  : "transparent",
                borderLeft: isActive(item.path)
                  ? "4px solid #3b82f6"
                  : "4px solid transparent",
                transition: "all 0.2s ease",
                gap: "12px",
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = "rgba(59, 130, 246, 0.05)";
                  e.currentTarget.style.color = "#e2e8f0";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#cbd5e1";
                }
              }}
            >
              <IconComponent style={{ fontSize: "20px", minWidth: "20px" }} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;