import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const loadProfile = async () => {
    const res = await fetch("/api/profile", { credentials: "include" });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const setAvatarFromUrl = async () => {
    if (!imageUrl.trim()) {
      alert("Enter an image URL");
      return;
    }

    const res = await fetch("/api/profile/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ url: imageUrl })
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to fetch image");
      return;
    }

    setImageUrl("");
    await loadProfile();
    alert("Profile picture fetched from URL");
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    window.location.href = "/login";
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8 }}>
      {/* Profile card */}
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Avatar
          src={user.avatar_url ? `/uploads/${user.avatar_url}` : undefined}
          sx={{ width: 90, height: 90, mx: "auto", bgcolor: "primary.main" }}
        >
          {!user.avatar_url && user.username?.[0]?.toUpperCase()}
        </Avatar>

        <Typography variant="h6" mt={2}>
          @{user.username}
        </Typography>
        <Typography color="text.secondary">{user.phone}</Typography>

        <Stack spacing={3} mt={4}>
          <TextField
            label="Profile Image URL"
            placeholder="https://images.safe.com/avatar.png"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="warning"
            disabled={!imageUrl.trim()}
            onClick={setAvatarFromUrl}
          >
            Set Picture From URL
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/chat")}
          >
            Go to Chat
          </Button>
        </Stack>
      </Paper>
      <Stack direction="row" spacing={10} justifyContent="center" sx={{ mt: 3 }}>
  <Button variant="outlined" onClick={() => window.history.back()}>
    ← Back
  </Button>
  <Button variant="outlined" color="error" onClick={logout}>
    Logout
  </Button>
</Stack>
    </Box>
  );
}
