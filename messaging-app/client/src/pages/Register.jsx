import { TextField, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username,
        phone,
        password
      })
    });

    if (res.ok) {
      window.location.href = "/login";
    } else {
      const err = await res.json();
      alert(err.message);
    }
  };
  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Create Account
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" fullWidth onClick={register}>
          Sign Up
        </Button>
      </Stack>
    </Paper>
  );
}
