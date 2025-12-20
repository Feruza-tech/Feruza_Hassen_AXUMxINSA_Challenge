import { TextField, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    window.location.href = "/profile";
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: "auto",
        mt: 10,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Welcome Back
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Username"
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={login}>
          Login
        </Button>

        <Button variant="outlined" onClick={() => window.history.back()}>
          ← Back
        </Button>
      </Stack>
      <Typography textAlign="center" mt={3}>
        Don’t have an account?{" "}
        <Button
          component={Link}
          to="/register"
          variant="text"
          sx={{ textTransform: "none" }}
        >
          Sign Up
        </Button>
      </Typography>
    </Paper>
  );
}
