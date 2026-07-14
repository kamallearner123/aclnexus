import logo from "../assets/ACL_Logo.png";
import { Link } from "react-router-dom";

function Sidebar({ role }) {
  return (
    <div
      style={{
        width: "280px",
        background: "#0f172a",
        boxShadow: "2px 0px 10px rgba(0,0,0,0.2)",
        color: "white",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <img
    src={logo}
    alt="ACL Logo"
    width="80"
  />

  <h2>ProjectPilot</h2>

  <p>Apt Computing Labs</p>
</div>

      <p>
        <Link
  to="/"
  style={{
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    display: "block",
    padding: "12px",
    borderRadius: "8px",
  }}
>
          Dashboard
        </Link>
      </p>
     <p>
  <Link
    to="/profile"
    style={{
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      display: "block",
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    My Profile
  </Link>
</p>
<p>
  <Link
    to="/change-password"
    style={{
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      display: "block",
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    Change Password
  </Link>
</p>

      {(role === "Admin" || role === "Manager") && (
        <>
          <p>
  <Link
    to="/projects"
    style={{
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      display: "block",
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    Projects
  </Link>
</p>

          <p>
            <Link
  to="/tasks"
  style={{
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    display: "block",
    padding: "12px",
    borderRadius: "8px",
  }}
>
              Tasks
            </Link>
          </p>

          <p>
            <Link
  to="/milestones"
  style={{
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    display: "block",
    padding: "12px",
    borderRadius: "8px",
  }}
>
              Milestones
            </Link>
          </p>
        </>
      )}

      {role === "Admin" && (
        <>
          <p>
            <Link
  to="/team-members"
  style={{
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    display: "block",
    padding: "12px",
    borderRadius: "8px",
  }}
>
              Team Members
            </Link>
          </p>

          <p>
            <Link
  to="/analytics"
  style={{
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    display: "block",
    padding: "12px",
    borderRadius: "8px",
  }}
>
              Analytics
            </Link>
          </p>

          <p>
  <Link
    to="/logs"
    style={{
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      display: "block",
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    Activity Logs
  </Link>
</p>

<p>
  <Link
    to="/notifications"
    style={{
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      display: "block",
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    Notifications
  </Link>
</p>
        </>
      )}
    </div>
  );
}

export default Sidebar;