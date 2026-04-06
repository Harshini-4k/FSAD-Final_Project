import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", background: "#f3f4f6" }}>
      <Box
        sx={{
          minHeight: "80vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Certification Tracker
          </Typography>

          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Store, manage, and track all your certifications in one place
          </Typography>

          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              backgroundColor: "#1d4ed8",
              color: "white",
              px: 5,
              py: 1.5,
              borderRadius: "999px",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#2563eb" },
            }}
          >
            GET STARTED
          </Button>
        </Container>
      </Box>

      <Container id="about" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 2 }}>
          About CertiTracker
        </Typography>

        <Typography align="center" sx={{ maxWidth: 800, mx: "auto", color: "#475569", mb: 4 }}>
          CertiTracker is a comprehensive platform designed to streamline certification management for students and professionals.
        </Typography>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography sx={{ mb: 2, color: "#475569" }}>
            • <strong>Centralized Management:</strong> Store all your certifications in one secure location
          </Typography>
          <Typography sx={{ mb: 2, color: "#475569" }}>
            • <strong>Expiry Tracking:</strong> Get notified about upcoming renewals and never miss deadlines
          </Typography>
          <Typography sx={{ mb: 2, color: "#475569" }}>
            • <strong>Role-Based Access:</strong> Separate dashboards for admins and users with appropriate permissions
          </Typography>
          <Typography sx={{ mb: 2, color: "#475569" }}>
            • <strong>Admin Oversight:</strong> Admins can monitor all user certifications, manage team progress, and generate organizational reports
          </Typography>
        </Box>

        <Box id="features" sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4 }}>
            Features
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Add Certifications
                  </Typography>
                  <Typography>Save details, dates, and status for each certification</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Expiry Tracking
                  </Typography>
                  <Typography>Know which certifications are expiring soon and need renewal</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Role-Based Access
                  </Typography>
                  <Typography>Admin and user dashboards for secure management across teams</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Dashboard Analytics
                  </Typography>
                  <Typography>Visualize certification data with charts and progress insights</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Notifications
                  </Typography>
                  <Typography>Receive alerts for expiring certifications and important updates</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                    Search and Filter
                  </Typography>
                  <Typography>Quickly find certifications by name, date, status, or category</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box sx={{ background: "#0f172a", color: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Typography align="center" sx={{ fontWeight: 600 }}>
            � 2026 CertiTracker � All rights reserved
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
