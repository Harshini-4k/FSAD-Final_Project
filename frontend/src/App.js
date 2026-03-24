import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem } from "@mui/material";

import Dashboard from "./Dashboard"; // User dashboard
import AdminDashboard from "./AdminDashboard"; // Admin dashboard
import Login from "./Login";
import Signup from "./Signup";
import AddCertification from "./AddCertification";

/* Optional: Sections for smooth scroll */
import About from "./About";
import Features from "./Features";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}
      >
        <Toolbar>

          {/* Logo */}
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
            CertiTracker
          </Typography>

          {/* Center Menu with smooth scroll */}
          <Box sx={{ display: "flex", gap: "25px", flexGrow: 2, justifyContent: "center" }}>
            <Button color="inherit" href="#home">Home</Button>
            <Button color="inherit" href="#about">About</Button>
            <Button color="inherit" href="#features">Features</Button>
            <Button color="inherit" href="#contact">Contact</Button>
          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Select size="small" defaultValue="English">
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Telugu">Telugu</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
            </Select>

            <Button color="inherit" component={Link} to="/login">Login</Button>

            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                borderRadius: "20px",
                padding: "5px 15px",
              }}
            >
              Signup for Free
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Dashboard />} />

        {/* Role-based dashboards */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* User */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin */}

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Add certification */}
        <Route path="/add" element={<AddCertification />} />

        {/* Optional anchor sections if you want separate pages */}
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;