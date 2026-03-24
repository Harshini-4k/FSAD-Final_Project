import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";

function Dashboard() {
  return (
    <div style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}>

      {/* ================= HOME SECTION ================= */}
      <Box
        id="home"
        sx={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "110px 20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.65)",
          }}
        />

        <Box sx={{ position: "relative" }}>
          <Typography variant="h3" fontWeight="bold">
            Certification Tracker
          </Typography>

          <Typography variant="h6" sx={{ marginTop: "20px" }}>
            Store, manage, and track all your certifications in one place
          </Typography>

          <Button
            variant="contained"
            sx={{
              marginTop: "25px",
              padding: "10px 25px",
              backgroundColor: "#1976d2",
              borderRadius: "25px",
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      <Container sx={{ marginTop: "60px" }}>

        {/* ================= ABOUT SECTION ================= */}
        <Box id="about" sx={{ marginBottom: "70px" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            About CertiTracker
          </Typography>

          <Typography align="center" sx={{ maxWidth: "800px", margin: "auto" }}>
            CertiTracker is a web application developed to help students and
            professionals manage all their certifications in one place.
            Instead of searching through emails or folders, users can easily
            store, update, and track their certifications using a simple and
            modern dashboard.
          </Typography>
        </Box>

        {/* ================= FEATURES SECTION ================= */}
        <Box id="features" sx={{ marginBottom: "70px" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            Powerful Features
          </Typography>

          <Grid container spacing={4} sx={{ marginTop: "20px" }}>

            <Grid item xs={12} md={3}>
              <Card sx={{ borderRadius: "15px", boxShadow: 3, backgroundColor: "#e3f2fd" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Add Certifications</Typography>
                  <Typography variant="body2">
                    Add certification name, company, and expiry date easily.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ borderRadius: "15px", boxShadow: 3, backgroundColor: "#fce4ec" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Track Expiry</Typography>
                  <Typography variant="body2">
                    Monitor certificate expiry dates in one dashboard.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ borderRadius: "15px", boxShadow: 3, backgroundColor: "#e8f5e9" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Easy Access</Typography>
                  <Typography variant="body2">
                    Access your certifications anytime from anywhere.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card sx={{ borderRadius: "15px", boxShadow: 3, backgroundColor: "#fff3e0" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Secure Platform</Typography>
                  <Typography variant="body2">
                    All certificates are stored safely and securely.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Box>

        {/* ================= WHY CHOOSE US SECTION ================= */}
        <Box sx={{ marginBottom: "70px" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            Why Choose CertiTracker?
          </Typography>

          <Grid container spacing={3} sx={{ marginTop: "20px" }}>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: "15px", boxShadow: 4 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Digital Certificate Storage
                  </Typography>
                  <Typography variant="body2">
                    Store all your certificates safely in one platform instead of emails and folders.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: "15px", boxShadow: 4 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Smart Expiry Alerts
                  </Typography>
                  <Typography variant="body2">
                    Get reminders before your certifications expire so you never miss renewals.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: "15px", boxShadow: 4 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Student Friendly Design
                  </Typography>
                  <Typography variant="body2">
                    Easy-to-use interface specially designed for students and beginners.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Box>

        {/* ================= CONTACT SECTION ================= */}
        <Box
          id="contact"
          sx={{
            backgroundColor: "#1a237e",
            color: "white",
            padding: "50px 20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Contact Us
          </Typography>

          <Typography sx={{ marginTop: "20px" }}>
            Email: certitracker@gmail.com
          </Typography>

          <Typography>
            Phone: +91 9876543210
          </Typography>
        </Box>

      </Container>
    </div>
  );
}

export default Dashboard;