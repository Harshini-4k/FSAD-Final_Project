import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

function AddCertification() {
  const [certificationName, setCertificationName] = useState("");
  const [organization, setOrganization] = useState("");
  const [course, setCourse] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const certification = {
      userId: parseInt(localStorage.getItem('userId')),
      certificationName,
      organization,
      course,
      issueDate,
      expiryDate,
      status: "ACTIVE"
    };

    await axios.post("http://localhost:8080/api/certifications", certification);

    alert("Certification added successfully!");

    setCertificationName("");
    setOrganization("");
    setCourse("");
    setIssueDate("");
    setExpiryDate("");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Paper style={{ padding: "30px" }}>
        <Typography variant="h4" gutterBottom>
          Add Certification
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Certification Name"
            fullWidth
            margin="normal"
            value={certificationName}
            onChange={(e) => setCertificationName(e.target.value)}
          />

          <TextField
            label="Organization"
            fullWidth
            margin="normal"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />

          <TextField
            label="Course"
            fullWidth
            margin="normal"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <TextField
            label="Issue Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />

          <TextField
            type="date"
            fullWidth
            margin="normal"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Save Certification
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddCertification;