import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
   <Box
  sx={{
    background: "linear-gradient(135deg, #f0f0f0 0%, #d9d9d9 100%)", // soft gradient
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 8,
    px: 2,
  }}
>
  <Box
    sx={{
      p: { xs: 3, sm: 5 },
      textAlign: "center",
      width: { xs: "95%", sm: 600 },
      minHeight: { xs: 320, sm: 480 },
      bgcolor: "white",
      borderRadius: 3,
      boxShadow: 4,
    }}
  >
        <Typography variant="h4" sx={{ mb: 2 }}>
          VulnGram 
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Messaging App
        </Typography>

        <Stack direction="row" spacing={10} justifyContent="center" sx={{ mt: 10 }}>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ bgcolor: "#1c6de6ff", px: 4 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/register"
            sx={{ borderColor: "#1c6de6ff", color: "#333", px: 4 }}
          >
            Sign Up
          </Button>
        </Stack>

        <Typography variant="caption" display="block" sx={{ mt: 20, color: "#666" }}>
          ⚠️ This site is intentionally insecure — do not use real credentials.
        </Typography>
      </Box>
    </Box>
  );
}
