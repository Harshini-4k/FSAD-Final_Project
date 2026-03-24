import React from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";

function AdminDashboard() {
  return (
    <Container sx={{ marginTop: "50px" }}>
      <Typography variant="h3" gutterBottom>
        Admin Dashboard
      </Typography>

      <Typography variant="body1" gutterBottom>
        Admin can manage all certification records, monitor expirations, and handle renewals.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "15px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Manage Certifications</Typography>
              <Typography>View, update, and delete user certifications.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "15px", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Monitor Expiry</Typography>
              <Typography>Keep track of upcoming certificate expirations.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;