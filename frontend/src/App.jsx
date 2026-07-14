import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import TeamMembers from "./pages/TeamMembers";
import Analytics from "./pages/Analytics";
import Milestones from "./pages/Milestones";
import ActivityLogs from "./pages/ActivityLogs";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) return;

    axios
      .post("http://localhost:8080/check-role", {
        email,
      })
      .then((res) => {
  console.log("ROLE:", res.data);
  setRole(res.data);
})
      .catch((err) => console.log(err));
  }, []);

  return (
  <BrowserRouter>

    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />
      <Route
  path="/register"
  element={<Register />}
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
      <Route
        path="*"
        element={
          <div style={{ display: "flex" }}>

            <Sidebar role={role} />

            <div style={{ flex: 1 }}>
              <Navbar />

              <Routes>

                <Route
                  path="/notifications"
                  element={<Notifications />}
                />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      {role === "Admin" ? (
                        <AdminDashboard />
                      ) : role === "Manager" ? (
                        <ManagerDashboard />
                      ) : role === "Employee" ? (
                        <EmployeeDashboard />
                      ) : (
                        <Dashboard />
                      )}
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/projects"
                  element={
                    <ProtectedRoute>
                      <Projects />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/team-members"
                  element={
                    <ProtectedRoute>
                      <TeamMembers />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/milestones"
                  element={
                    <ProtectedRoute>
                      <Milestones />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/logs"
                  element={
                    <ProtectedRoute>
                      <ActivityLogs />
                    </ProtectedRoute>
                  }
                />

              </Routes>

            </div>

          </div>
        }
      />

    </Routes>

  </BrowserRouter>
);
}

export default App;