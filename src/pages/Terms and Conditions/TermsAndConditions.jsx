import React from "react";
import { Box, Container, Typography, Link, Divider } from "@mui/material";

export default function TermsAndConditions() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        px: { xs: 2, sm: 4 },
        py: 8,
      }}
    >
      <Container
        maxWidth="md"
        
        sx={{
    p: { xs: 3, md: 5 },
    bgcolor: "background.default",
    boxShadow: "none",
  }}
      >
        {/* Header */}
        <Box mb={6}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Terms and Conditions
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Last updated: February 10, 2026
          </Typography>

          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* Content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Typography>
            Please read these terms and conditions carefully before using Our
            Service.
          </Typography>

          {/* Section */}
          <Section title="Interpretation and Definitions">
            <SubTitle>Interpretation</SubTitle>
            <Typography color="text.secondary">
              The words whose initial letters are capitalized have meanings
              defined under the following conditions.
            </Typography>

            <SubTitle>Definitions</SubTitle>

            <Typography component="ul" sx={{ pl: 3, mt: 2 }}>
              <ListItem><strong>Affiliate:</strong> An entity under common control.</ListItem>
              <ListItem><strong>Country:</strong> Tripura, India</ListItem>
              <ListItem><strong>Company:</strong> L.AI.RRY – online mock-test platform</ListItem>
              <ListItem><strong>Device:</strong> Any device accessing the Service.</ListItem>
              <ListItem><strong>Service:</strong> Refers to the Website.</ListItem>
              <ListItem><strong>Terms:</strong> These Terms governing use.</ListItem>
              <ListItem>
                <strong>Website:</strong>{" "}
                <Link
                  href="https://lairry.app"
                  target="_blank"
                  underline="hover"
                  color="primary"
                >
                  lairry.app
                </Link>
              </ListItem>
              <ListItem><strong>You:</strong> The individual accessing the Service.</ListItem>
            </Typography>
          </Section>

          <Section title="Acknowledgment">
            <Typography color="text.secondary">
              These Terms and Conditions govern the use of this Service and form
              the agreement between You and the Company.
            </Typography>
          </Section>

          <Section title="Links to Other Websites">
            <Typography color="text.secondary">
              Our Service may contain links to third-party websites.
            </Typography>
          </Section>

          <Section title="Termination">
            <Typography color="text.secondary">
              We may terminate or suspend Your access if You breach these Terms.
            </Typography>
          </Section>

          <Section title="Limitation of Liability">
            <Typography color="text.secondary">
              The Company’s total liability shall be limited to the amount paid
              by You or 100 USD.
            </Typography>
          </Section>

          <Section title='"AS IS" and "AS AVAILABLE" Disclaimer'>
            <Typography color="text.secondary">
              The Service is provided without warranty of any kind.
            </Typography>
          </Section>

          <Section title="Governing Law">
            <Typography color="text.secondary">
              These Terms shall be governed by the laws of Tripura, India.
            </Typography>
          </Section>

          <Section title="Disputes Resolution">
            <Typography color="text.secondary">
              You agree to resolve disputes informally first.
            </Typography>
          </Section>

          <Section title="Changes to These Terms and Conditions">
            <Typography color="text.secondary">
              Continued use of the Service means acceptance of revised Terms.
            </Typography>
          </Section>

          <Section title="Contact Us">
            <Typography>
              If you have any questions about these Terms, contact us at:
            </Typography>

            <Typography fontWeight={600} mt={1}>
              📧{" "}
              <Link
                href="mailto:nn8ninsyssky@gmail.com"
                underline="hover"
                color="primary"
              >
                nn8ninsyssky@gmail.com
              </Link>
            </Typography>
          </Section>
        </Box>
      </Container>
    </Box>
  );
}

/* Helper Components */

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function SubTitle({ children }) {
  return (
    <Typography
      variant="h6"
      fontWeight={600}
      color="primary"
      mt={3}
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
        mb: 1.5,
        color: "text.secondary",
      }}
    >
      {children}
    </Typography>
  );
}
