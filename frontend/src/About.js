import React from "react";
import { Container, Typography } from "@mui/material";

function About() {
  return (
    <Container sx={{ marginTop: "50px" }}>
      <Typography variant="h4" fontWeight="bold">
        About Certification Tracker
      </Typography>

      <Typography sx={{ marginTop: "20px" }}>
        Certification Tracker is a web application designed to help students and
        professionals manage all their certifications in one place. Instead of
        searching in emails or folders, users can store and track their
        certifications easily using this platform.
      </Typography>
    </Container>
  );
}

export default About;