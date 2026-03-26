import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Select, MenuItem, Typography, Box } from "@mui/material";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // default role
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        name: name,
        email: email,
        password: password,
        role: role
      });

      if (response.data.success) {
        alert("Signup successful!");
        navigate("/login");   // redirect to login page
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Signup failed. Please check console for details.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>

      <TextField
        label="Name"
        fullWidth
        sx={{ mb: 2 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Box sx={{ mb: 2 }}>
        <Typography>Role:</Typography>
        <Select
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </Select>
      </Box>

      <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
        Signup
      </Button>
    </Container>
  );
}

export default Signup;