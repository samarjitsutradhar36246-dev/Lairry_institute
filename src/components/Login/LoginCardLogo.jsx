import {
    Box,
    Typography,
Avatar
} from "@mui/material";

const LoginCardLogo = () => {
    return (
        <Box textAlign="center" mb={4} p={1}>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1.5} mb={3}>
                <Box sx={{ width: 32, color: "#1337ec" }}>
                    
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
                <Typography fontSize={22} fontWeight={700}>
                    Lairry - Online Institute Panel
                </Typography>
            </Box>

            <Typography variant="h4" fontWeight={700} mb={1}>
                Welcome Back
            </Typography>
            <Typography color="#94a3b8" fontSize={14}>
                Continue your journey towards success
            </Typography>
        </Box>
    )
}

export default LoginCardLogo