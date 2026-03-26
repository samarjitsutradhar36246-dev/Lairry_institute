import {
  Box,
} from "@mui/material";


const LoginFormBg = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 500,
          height: 500,
          bgcolor: "rgba(19,55,236,0.2)",
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.4,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: 300,
          height: 300,
          bgcolor: "rgba(147,51,234,0.1)",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.3,
        }}
      />

    </>
  )
}

export default LoginFormBg