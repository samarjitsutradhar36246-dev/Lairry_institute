import React from "react";
import { Box, Typography, Container, Link, Card } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "text.primary",
         bgcolor: "background.default",
        p: 3,
        
       
      }}
    >
      <Container maxWidth="md" >
        <Card
  elevation={0}
  sx={{
    p: { xs: 3, md: 5 },
    bgcolor: "background.default",
    boxShadow: "none",
  }}
>

          {/* Header */}
          <Box mb={6}>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Privacy Policy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: February 10, 2026
            </Typography>
          </Box>

          {/* Intro */}
          <Section>
            <Typography paragraph>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </Typography>

            <Typography paragraph>
              We use Your Personal Data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.
            </Typography>
          </Section>

          {/* Interpretation */}
          <Section title="Interpretation and Definitions">
            <SubTitle>Interpretation</SubTitle>
            <Typography paragraph color="text.secondary">
              The words whose initial letters are capitalized have meanings
              defined under the following conditions.
            </Typography>

            <SubTitle>Definitions</SubTitle>

            <ListItem><b>Account</b> means a unique account created for You.</ListItem>
            <ListItem><b>Affiliate</b> means an entity under common control.</ListItem>
            <ListItem><b>Company</b> refers to <b>L.AI.RRY</b>.</ListItem>
            <ListItem><b>Cookies</b> are small files placed on Your device.</ListItem>
            <ListItem><b>Country</b> refers to Tripura, India.</ListItem>
            <ListItem><b>Device</b> means any device that can access the Service.</ListItem>
            <ListItem><b>Personal Data</b> means identifiable information.</ListItem>
            <ListItem><b>Service</b> refers to the Website.</ListItem>
            <ListItem><b>Usage Data</b> refers to automatically collected data.</ListItem>

            <ListItem>
              <b>Website</b> refers to{" "}
              <Link
                href="https://lairry.app"
                target="_blank"
                underline="hover"
                color="primary"
              >
                lairry.app
              </Link>
            </ListItem>

            <ListItem><b>You</b> means the individual using the Service.</ListItem>
          </Section>

          {/* Data Collection */}
          <Section title="Collecting and Using Your Personal Data">
            <SubTitle>Types of Data Collected</SubTitle>

            <Typography fontWeight={600} mb={1}>
              Personal Data
            </Typography>
            <ListItem>Email address</ListItem>
            <ListItem>First name and last name</ListItem>
            <ListItem>Phone number</ListItem>

            <Typography fontWeight={600} mt={3} mb={1}>
              Usage Data
            </Typography>
            <Typography paragraph color="text.secondary">
              Usage Data is collected automatically including IP address,
              browser type, pages visited and duration.
            </Typography>
          </Section>

          {/* Cookies */}
          <Section title="Tracking Technologies and Cookies">
            <ListItem>
              <b>Essential Cookies:</b> Required for basic site functionality.
            </ListItem>
            <ListItem>
              <b>Acceptance Cookies:</b> Remember cookie consent.
            </ListItem>
            <ListItem>
              <b>Functionality Cookies:</b> Remember preferences.
            </ListItem>
          </Section>

          {/* Usage */}
          <Section title="Use of Your Personal Data">
            <ListItem>To provide and maintain the Service</ListItem>
            <ListItem>To manage user accounts</ListItem>
            <ListItem>To contact users</ListItem>
            <ListItem>To improve products and services</ListItem>
            <ListItem>For legal and security purposes</ListItem>
          </Section>

          {/* Security */}
          <Section title="Security of Your Personal Data">
            <Typography paragraph color="text.secondary">
              While We strive to protect Your Personal Data, no method of
              transmission over the Internet is 100% secure.
            </Typography>
          </Section>

          {/* Children */}
          <Section title="Children's Privacy">
            <Typography paragraph color="text.secondary">
              Our Service does not address anyone under the age of 16.
            </Typography>
          </Section>

          {/* Changes */}
          <Section title="Changes to this Privacy Policy">
            <Typography paragraph color="text.secondary">
              We may update Our Privacy Policy from time to time.
            </Typography>
          </Section>

          {/* Contact */}
          <Section title="Contact Us">
            <Typography paragraph>
              If you have any questions, contact us at:
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={600}
            >
              📧 nn8ninsyssky@gmail.com
            </Typography>
          </Section>
        </Card>
      </Container>
    </Box>
  );
}

/* Helper Components */

function Section({ title, children }) {
  return (
    <Box mb={6}>
      {title && (
        <Typography variant="h5" fontWeight={700} mb={3}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
}

function SubTitle({ children }) {
  return (
    <Typography
      variant="h6"
      color="primary"
      fontWeight={600}
      mt={2}
      mb={1}
    >
      {children}
    </Typography>
  );
}

function ListItem({ children }) {
  return (
    <Typography
      component="li"
      sx={{
        ml: 3,
        mb: 1.5,
        color: "text.secondary",
      }}
    >
      {children}
    </Typography>
  );
}
