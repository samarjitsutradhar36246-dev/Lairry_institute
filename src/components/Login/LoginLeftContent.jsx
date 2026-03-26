import {
  Box,
  Typography,Avatar
 } from "@mui/material";
const LoginLeftContent = () => {
  return (
     <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: "50%",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#0a0c16",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhQMqq8ULToSsP7BJSsvl1EZamomvMustZ3On3CZiXVj3lqUajLO3IbFTeoj1UZscd9Rnhzq214Ce77q0oOu2sEhQQCLQpssH2hJMyVwajV5fA-193Y8F5Qfw9MjdvLG1eJxtTjWpLkmQFjnW2vWqgqVUw6phkOKdMivf2R1PBP7zBekDDd4pQB-8ixD0cCvsjPuFzhtfIORsbwPlOzemTyV3EBidB9wya7-N2AvPIWu-M04svpDJHA4akK5XfJfDl9WOy6q9wo2c")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.6,
            mixBlendMode: "overlay",
          }}
        />

        {/* Gradient Overlays */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, #101322, transparent, rgba(16,19,34,0.5))",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(16,19,34,0.2), #101322)",
          }}
        />

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 480, p: 2,
         }}>
          <Box
            sx={{
              mb: 4,
              py:1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: "50%",
                bgcolor: "rgba(19,55,236,0.1)",
                border: "1px solid rgba(19,55,236,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
             
              <Avatar
                          className="cursor-pointer"
                          src="/images/logo.svg"
                          sx={{
                            width: 40,
                            height: 40,
                            border: (theme) =>
                              `2px solid ${theme.palette.primary.main}`,
                          }}
                          onClick={() => navigate("/settings")}
                        />
            </Box>
          </Box>

          <Typography variant="h4" fontWeight={700}  className="text-center leading-1.5">
            Manage And Update Your Exams 
          </Typography>
          <Typography color="#94a3b8" fontSize={18} className="text-center leading-1">
            Join thousands of institutes enhancing their exams efficiency through our adaptive mock test environment.
          </Typography>
        </Box>
      </Box>

  )
}

export default LoginLeftContent