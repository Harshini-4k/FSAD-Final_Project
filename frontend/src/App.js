import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem, Container } from "@mui/material";

import Dashboard from "./Dashboard"; // Landing page
import UserDashboard from "./UserDashboard"; // User certifications
import AdminDashboardPage from "./AdminDashboardPage"; // Admin certifications
import Login from "./Login";
import Signup from "./Signup";
import AddCertification from "./AddCertification";
import ProtectedRoute from "./ProtectedRoute";

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    setUser(null);
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          color: "#1a1a1a",
          boxShadow: "0 2px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#1976d2", textDecoration: "none" }}
              >
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                  CertiTracker
                </Link>
              </Typography>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 500 }}>
                Home
              </Button>
              <Button color="inherit" onClick={() => scrollToSection('about')} sx={{ fontWeight: 500 }}>
                About
              </Button>
              <Button color="inherit" onClick={() => scrollToSection('features')} sx={{ fontWeight: 500 }}>
                Features
              </Button>
              {user ? (
                <>
                  <Button color="inherit" component={Link} to="/dashboard">
                    Dashboard
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    sx={{ backgroundColor: "#1976d2", borderRadius: "25px", px: 3, fontWeight: 600 }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
              <Select size="small" defaultValue="English">
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Telugu">Telugu</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
              </Select>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddCertification />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
